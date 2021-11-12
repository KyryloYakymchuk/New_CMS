import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Connection, Model } from "mongoose";
import * as shortid from "shortid";
import * as fs from "fs";
import * as Client from "ssh2-sftp-client";
import * as uniqid from "uniqid";
import { join } from "path";

import { Module } from "../types/module";
import {
  AddFieldsDTO,
  AddItemCategoryDTO,
  AddItemDTO,
  AddModuleDTO,
  DeleteFieldsDTO,
  DeleteItemCategoryDTO,
  DeleteItemDTO,
  DeleteModuleDTO,
  EditFieldsDTO,
  EditFieldsOrderDTO,
  EditItemDTO,
  EditItemsDTO,
  EditItemsOrderDTO,
  EditModuleDTO,
  MarkNewsDTO,
  EditVariantsOrderDTO,
  GetItemCategoriesDTO,
  GetItemVariantsDTO,
  ModuleIDDTO,
  ModuleNameDTO,
  PaginationDTO,
  SetVariantStockDTO,
  WishListDTO,
} from "./dto/modules.dto";
import { UploaderService } from "../shared/uploader/uploader.service";
import { Category } from "src/types/category";
import { QueryDTO } from "../shared/dto/shared.dto";
import { FuserService } from "../shared/fuser/fuser.service";
import { AddVariantDTO } from "./dto/modules.dto";

export const options = {
  useNewUrlParser: true,
  server: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  },
};

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel("Module") private moduleModel: Model<Module>,
    @InjectModel("Category") private categoryModel: Model<Category>,
    @InjectConnection() private connection: Connection,
    private uploaderService: UploaderService,
    private userService: FuserService
  ) {}

  private static validateType(type: string): string {
    const typesArr = ["string", "number", "boolean", "array", "date"];

    if (!typesArr.includes(type.toLowerCase())) {
      throw new HttpException("Wrong type!", HttpStatus.NOT_ACCEPTABLE);
    }

    return type.toLowerCase();
  }

  private generateSchema(
    // fields: Record<any, any>,
    module: Record<any, any>
  ): string {
    // const typeForSchema = {
    //   string: `String,`,
    //   number: `Number,`,
    //   boolean: `Boolean,`,
    //   array: `Array,`,
    //   date: `Date,`,
    // };
    //
    // let typesStr = ``;
    // Object.keys(fields).forEach((field) => {
    //   typesStr += `
    //         ${field}: ${typeForSchema[fields[field]]}`;
    // });

    const editedName =
      module.name.charAt(0).toUpperCase() + module.name.slice(1) + "Schema";

    return `
        const mongoose = require('mongoose')
        const ${editedName} = new mongoose.Schema(
          {
            order: {
              type: Number,
            },
            category: {
              type: String,
            },
            itemData: {
              type: Object,
              required: true
            },
            variants: {
              type: Array,
            },
          },
          { collection: '${module.name}' }
        );
        module.exports = mongoose.models['${module.name}'] || mongoose.model('${module.name}', ${editedName});
      `;
  }

  private async saveSchema(schema: string, path: string) {
    fs.open(path, "w", (err, fd) => {
      if (err) throw new HttpException(err, HttpStatus.BAD_REQUEST);
      fs.appendFile(path, schema, (err) => {
        if (err) throw new HttpException(err, HttpStatus.BAD_REQUEST);
        fs.close(fd, (err) => {
          if (err) throw new HttpException(err, HttpStatus.BAD_REQUEST);
        });
      });
    });
  }

  private static async createItem(moduleName, model): Promise<any> {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${moduleName}`);
    const items = await Item.find();

    const maxOrderObject =
      items.length > 0 &&
      items.reduce(
        (prev, current) => (prev.order > current.order ? prev : current),
        {}
      );

    model.order = items.length === 0 ? 0 : maxOrderObject.order + 1;

    const newItem = new Item(model);
    await newItem.save();

    await mongoose.connection.close();
    return newItem;
  }

  async findModulesByName(name: any): Promise<Record<string, any>> {
    return this.moduleModel.findOne({ name: new RegExp(name, "gi") });
  }

  async findModulesByID(moduleID: any): Promise<Record<string, any>> {
    return this.moduleModel.findOne({ moduleID });
  }

  async putFilesInObj(files: Record<any, any>, module: Record<any, any>) {
    let filesObj = {};

    files.forEach((file) => {
      this.uploaderService.validateImgType(file);
      const fieldID = file.fieldname.split("-")[0];
      let fieldName: string;

      module.fields.forEach((field) => {
        if (fieldID === field.id) fieldName = field.settings.textPrompt;
      });

      if (filesObj[fieldName])
        filesObj[fieldName].push(file.filename.split("_")[4]);
      else filesObj[fieldName] = [file.filename.split("_")[4]];
    });

    return filesObj;
  }

  async saveImgInDB(
    moduleName: string,
    itemID: string,
    filesObj: Record<any, any>
  ) {
    const generatedModel = await require(`../../schemas/${moduleName}`);

    await generatedModel.findOneAndUpdate(
      { itemID: itemID },
      { $set: filesObj },
      { new: true }
    );
  }

  async validateFields(fields: any): Promise<any> {
    const allowedNames = ["name", "type", "settings", "id", "order"];
    const allowedSettings = [
      "checkbox",
      "textbox",
      "textarea",
      "upload",
      "module",
      "dropdown",
      "wysiwyg",
      "map",
      "id",
      "textPrompt",
      "maxChars",
      "width",
      "defaultText",
      "required",
      "height",
      "maxItems",
      "fileTypes",
      "autoresize",
      "specifications",
      "names",
      "values",
      "coordinates",
      "icon",
      "maxSize",
    ];

    fields.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (!allowedNames.includes(key)) {
          throw new HttpException("Bad fields!", HttpStatus.BAD_REQUEST);
        }
        if (key === "settings") {
          Object.keys(obj[key]).forEach((setting) => {
            if (!allowedSettings.includes(setting)) {
              throw new HttpException(
                "Bad fields settings!",
                HttpStatus.BAD_REQUEST
              );
            }
          });
        }
        if (!obj["id"]) {
          obj["id"] = uniqid("f_");
        }
      });
    });

    return fields;
  }

  async getModules(userDTO: QueryDTO): Promise<Record<string, any>> {
    const { search, limit, offset, sortField, sortParameter } = userDTO;

    const modules = await this.moduleModel
      .find(!!search ? { name: { $regex: new RegExp(search, "i") } } : {})
      .sort({ [sortField]: sortParameter })
      .limit(!!limit ? +limit : 10)
      .skip(!!offset ? +offset : 0);

    const modulesCount = await this.moduleModel.find(
      !!search ? { name: { $regex: new RegExp(search, "i") } } : {}
    );

    if (modulesCount.length === 0) {
      throw new HttpException("Modules not found!", HttpStatus.NOT_FOUND);
    }

    return { count: modulesCount.length, modules };
  }

  async createModule(userDTO: AddModuleDTO): Promise<Record<string, string>> {
    const { name, fields = [], icon, categories } = userDTO;
    const module = await this.findModulesByName(name);

    if (module) {
      throw new HttpException(
        "This module is already exists!",
        HttpStatus.CONFLICT
      );
    }

    fields.unshift({
      name: "dropdown",
      type: "string",
      settings: {
        textPrompt: "status",
        values: "disabled,publish,archived",
      },
      id: "f_Status",
      order: 3,
    });

    fields.unshift({
      name: "datePicker",
      type: "string",
      settings: {
        textPrompt: "archiveDate",
      },
      id: "f_aDate",
      order: 2,
    });

    fields.unshift({
      name: "datePicker",
      type: "string",
      settings: {
        textPrompt: "publishDate",
      },
      id: "f_pDate",
      order: 1,
    });

    fields.unshift({
      name: "textbox",
      type: "string",
      settings: {
        textPrompt: "name",
      },
      id: "f_name",
      order: 0,
    });

    const newModule = new this.moduleModel({
      name,
      fields,
      icon,
      categories,
    });

    await newModule.save();

    return { message: "Module created successfully!" };
  }

  async getItemsList(
    moduleName: string,
    paginationDTO?: PaginationDTO
  ): Promise<Record<any, any>> {
    const { limit, offset } = paginationDTO;
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${moduleName}`);

    const items = await Item.find()
      .skip(!!offset ? +offset : "")
      .limit(!!limit ? +limit : "");
    const fullItemsList = await Item.find();

    await mongoose.connection.close();
    return { count: fullItemsList.length, items };
  }

  async getItemByID(
    moduleName: string,
    itemID: string
  ): Promise<Record<any, any>> {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${moduleName}`);

    return (
      (await Item.findOne({ "itemData.itemID": itemID })) ||
      (await Item.findOne({ itemID }))
    );
  }

  async removeItemByID(
    moduleName: string,
    itemID: string
  ): Promise<Record<any, any>> {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${moduleName}`);
    let currentItem = await Item.findOneAndDelete({
      "itemData.itemID": itemID,
    });
    if (!currentItem) {
      currentItem = await Item.findOneAndDelete({ itemID });
    }
    await mongoose.connection.close();
    return currentItem;
  }

  async editItemByID(
    moduleName: string,
    itemID: string,
    items: object
  ): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${moduleName}`);
    for (let item in items) {
      if (items.hasOwnProperty(item)) {
        await Item.findOneAndUpdate(
          { "itemData.itemID": itemID },
          { [`${item}`]: items[item] }
        );
        await Item.findOneAndUpdate({ itemID }, { [`${item}`]: items[item] });
      }
    }
    await mongoose.connection.close();
  }

  async changeItemsOrder(name: string, items: object): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${name}`);

    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        await Item.findOneAndUpdate(
          { "itemData.itemID": key },
          { order: items[key] }
        );
      }
    }
    await mongoose.connection.close();
  }

  async changeFieldsOrder(
    name: string,
    fields: Record<string, any>,
    moduleID: string
  ) {
    await mongoose.connect(process.env.MONGO_URI, options);

    const module = await this.moduleModel.findOne({ moduleID });

    for (let key in fields) {
      if (fields.hasOwnProperty(key)) {
        let fieldIndex = module.fields.findIndex((i) => i.id === key);
        module.fields[fieldIndex].order = fields[key];
      }
    }

    await mongoose.connection.close();

    return this.moduleModel.findOneAndUpdate(
      { moduleID },
      { $set: { fields: module.fields } },
      { new: true }
    );
  }

  async addVariantByItemID(
    name: string,
    itemID: string,
    variant: Record<any, any>
  ): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI, options);

    const Item = require(`../../schemas/${name}`);
    const { variants: prevVariants } = await Item.findOne({
      "itemData.itemID": itemID,
    }).select("variants");

    const maxObject =
      prevVariants.length > 0 &&
      prevVariants.reduce(
        (prev, current) => (prev.b > current.b ? prev : current),
        {}
      );

    variant.order = prevVariants.length === 0 ? 0 : maxObject.order + 1;

    await Item.findOneAndUpdate(
      { "itemData.itemID": itemID },
      { variants: [...prevVariants, variant] }
    );

    await mongoose.connection.close();
  }

  async deleteVariantByID(
    name: string,
    itemID: string,
    variantID: string
  ): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${name}`);
    const variant = await Item.findOne({ "variants.variantID": variantID });
    if (variant)
      await Item.findOneAndUpdate(
        { "variants.variantID": variantID },
        { variants: variant.variants.filter((i) => i.variantID !== variantID) }
      );
    await mongoose.connection.close();
  }

  async editVariantByID(
    name: string,
    variantID: string,
    variant: Record<string, any>
  ) {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${name}`);
    const isVariantExist = await Item.findOne({
      "variants.variantID": variantID,
    });

    const { variants } = isVariantExist;
    const variantIndex = variants.findIndex((i) => i.variantID === variantID);

    if (isVariantExist && variantIndex !== "-1") {
      for (let key in variant) {
        if (variant.hasOwnProperty(key)) {
          variants[variantIndex][key] = variant[key];
        }
      }
    }
    await Item.findOneAndUpdate(
      { "variants.variantID": variantID },
      { variants }
    );
    await mongoose.connection.close();
  }

  async changeVariantsOrder(name: string, variants: object) {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${name}`);
    const variantID = Object.keys(variants)[0];
    const currentItem = await Item.findOne({ "variants.variantID": variantID });

    for (let key in variants) {
      if (variants.hasOwnProperty(key)) {
        let variantIndex = currentItem.variants.findIndex(
          (i) => i.variantID === key
        );
        currentItem.variants[variantIndex].order = variants[key];
      }
    }

    await Item.findOneAndUpdate(
      { "variants.variantID": variantID },
      { variants: currentItem.variants },
      { set: true }
    );
    await mongoose.connection.close();
    return currentItem.itemID;
  }

  async addItem(
    userDTO: AddItemDTO,
    files: Record<any, any>,
    body: any,
    paginationDTO: PaginationDTO
  ): Promise<any> {
    const { data } = userDTO;
    const parsedData = JSON.parse(data);

    const module = await this.findModulesByID(parsedData.moduleID);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    if (!parsedData.fields.length)
      throw new HttpException("Fields array is empty!", HttpStatus.BAD_REQUEST);

    const modelFile = join(__dirname, "..", "schemas", `${module.name}.js`);

    const newItemID = uniqid("i_");
    const model = { itemData: { "itemData.itemID": newItemID } };

    const generateModel = () => {
      module.fields.forEach((field) => {
        parsedData.fields.forEach((input) => {
          model[field.settings.textPrompt] = input.value;
        });
      });

      return model;
    };

    const saveItem = async () => {
      const newItem = await ModulesService.createItem(
        module.name,
        generateModel()
      );

      const filesObj = await this.putFilesInObj(files, module);
      if (!!Object.keys(filesObj).length)
        await this.saveImgInDB(module.name, newItem.itemID, filesObj);
    };

    fs.stat(modelFile, async (err) => {
      if (err) {
        const fields = { itemID: "string" };
        module.fields.forEach((field) => {
          fields[field.settings.textPrompt] = ModulesService.validateType(
            field.type
          );
        });
        await this.saveSchema(this.generateSchema(module), modelFile);
        await saveItem();
      } else await saveItem();
    });

    const itemsList = await this.getItemsList(module.name, paginationDTO);
    const newItem = await this.getItemByID(module.name, newItemID);

    itemsList.items.push(newItem);
    return { count: itemsList.length, items: itemsList };
  }

  async changeVariantStock(
    name: string,
    itemID: string,
    variantID: string,
    storage: object
  ) {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${name}`);

    const item = await Item.findOne({ itemID });
    const currentVariantIndex = item.variants.findIndex(
      (i) => i.variantID === variantID
    );

    if (currentVariantIndex === -1) {
      throw new HttpException("Variant not found!", HttpStatus.NOT_FOUND);
    }

    for (let key in storage) {
      if (storage.hasOwnProperty(key)) {
        item.variants[currentVariantIndex].PriceBands.stock[key] = storage[key];
      }
    }
    await Item.findOneAndUpdate(
      { "itemData.itemID": itemID },
      { variants: item.variants }
    );
    await mongoose.connection.close();
  }

  async changeItemCategories(name: string, itemID: string, categoryID: string) {
    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${name}`);

    const currentItem = await Item.findOne({ itemID });
    const { categories } = currentItem;

    const isCategoryAlreadyExist = categories.includes(categoryID);

    if (isCategoryAlreadyExist) {
      throw new HttpException("Module not found!", HttpStatus.CONFLICT);
    }
    categories.push(categoryID);
    await Item.findOneAndUpdate({ "itemData.itemID": itemID }, { categories });
    await mongoose.connection.close();
  }

  async getItemCategories(
    userDTO: GetItemCategoriesDTO
  ): Promise<Record<string, any>> {
    const { moduleName: name, itemID } = userDTO;

    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${name}`);
    const currentItem = await Item.findOne({ "itemData.itemID": itemID });

    const categories = await this.categoryModel.find({});
    await mongoose.connection.close();

    return (
      currentItem?.categories &&
      currentItem.categories.map((item) => {
        const category = categories.find((i) => i.categoryID === item);
        if (category) {
          return {
            categoryID: category.categoryID,
            name: category.name,
          };
        }
      })
    );
  }

  async removeItemCategoryByID(userDTO: DeleteItemCategoryDTO) {
    const { moduleName: /*userName,*/ itemID, categoryID } = userDTO;

    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${userDTO.moduleName}`);
    const currentItem = await Item.findOne({ "itemData.itemID": itemID });
    const newCategories =
      currentItem?.categories?.length &&
      currentItem.categories.filter((i) => i !== categoryID);
    await Item.findOneAndUpdate(
      { "itemData.itemID": itemID },
      { categories: newCategories }
    );
    await mongoose.connection.close();
  }

  async getItems(
    userDTO: ModuleNameDTO,
    paginationDTO: PaginationDTO
  ): Promise<Record<string, any>> {
    const file = join(__dirname, "..", "schemas", `${userDTO}.js`);
    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.BAD_REQUEST);
      }
    });
    return this.getItemsList(String(userDTO), paginationDTO);
  }

  async deleteItem(
    userDTO: DeleteItemDTO,
    paginationDTO: PaginationDTO
  ): Promise<Record<string, any>> {
    const { itemID, moduleName } = userDTO;

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const isItemExist = await this.getItemByID(moduleName, itemID);

    if (!isItemExist) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }
    await this.removeItemByID(moduleName, itemID);
    return this.getItemsList(moduleName, paginationDTO);
  }

  async editItem(
    userDTO: EditItemDTO,
    files: Record<any, any>
  ): Promise<Record<string, any>> {
    const { data } = userDTO;
    let parsedData;
    if (data) parsedData = JSON.parse(data);
    const { moduleName, itemID, items } = parsedData;

    const module = await this.findModulesByName(moduleName);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    let itemsToEdit = {};

    const generateItemsToEdit = () => {
      module.fields.forEach((field) => {
        items.forEach((input) => {
          if (input.id === field.id) {
            itemsToEdit[field.settings.textPrompt] = input.value;
          }
        });
      });
      return itemsToEdit;
    };

    const file = join(__dirname, "..", "schemas", `${module.name}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const filesObj = await this.putFilesInObj(files, module);
    if (!!Object.keys(filesObj).length)
      await this.saveImgInDB(module.name, itemID, filesObj);

    await this.editItemByID(moduleName, itemID, generateItemsToEdit());
    return this.getItemsList(moduleName);
  }

  async editItemsOrder(
    userDTO: EditItemsOrderDTO
  ): Promise<Record<string, any>> {
    const { moduleName, items } = userDTO;

    const module = await this.findModulesByName(moduleName);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    await this.changeItemsOrder(moduleName, items);

    return this.getItemsList(moduleName);
  }

  async addVariant(userDTO: AddVariantDTO): Promise<Record<string, any>> {
    const { moduleName, itemID } = userDTO;

    const module = await this.findModulesByName(moduleName);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);
    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const isItemExist = await this.getItemByID(moduleName, itemID);
    if (!isItemExist) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    const newVariant = {
      variantID: shortid.generate(),
    };
    await this.addVariantByItemID(moduleName, itemID, newVariant);

    return newVariant.variantID;
  }

  // async deleteVariant(userDTO: DeleteVariantDTO): Promise<Record<string, any>> {
  //   const { moduleName, itemID, variantID } = userDTO;
  //
  //   const file = join(__dirname, "..", "schemas", `${moduleName}.js`);
  //
  //   fs.access(file, async (err) => {
  //     if (err) {
  //       throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
  //     }
  //   });
  //
  //   await this.deleteVariantByID(moduleName, itemID, variantID);
  //
  //   const item = await this.getItemByID(moduleName, itemID);
  //   return item.variants;
  // }

  // async editVariant(
  //   userDTO: EditVariantDTO
  //   // files: Record<any, any>
  // ): Promise<Record<string, any>> {
  //   const { moduleName, variantID } = userDTO;
  //   const module = await this.findModulesByName(moduleName);
  //
  //   if (!module)
  //     throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);
  //
  //   const file = join(__dirname, "..", "schemas", `${moduleName}.js`);
  //
  //   fs.access(file, async (err) => {
  //     if (err) {
  //       throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
  //     }
  //   });
  //
  //   const editVariant = {
  //     variantID,
  //     name: userDTO.name,
  //     quantity: userDTO.quantity,
  //     werehouse: userDTO.werehouse,
  //     price: userDTO.price,
  //     discount: userDTO.discount,
  //     tax: userDTO.tax,
  //   };
  //
  //   await this.editVariantByID(moduleName, variantID, editVariant);
  //
  //   // const filesObj = await this.putFilesInObj(files, module);
  //   // if (!!Object.keys(filesObj).length)
  //   //   await this.saveImgInDB(module.name, variantID, filesObj);
  //
  //   return this.getItemsList(moduleName);
  // }

  async editVariantsOrder(
    userDTO: EditVariantsOrderDTO
  ): Promise<Record<string, any>> {
    const { moduleName, variants } = userDTO;

    const module = await this.findModulesByName(moduleName);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    let itemID = await this.changeVariantsOrder(moduleName, variants);
    if (itemID) {
      return this.getItemByID(moduleName, itemID);
    }
  }

  async editItems(
    userDTO: EditItemsDTO,
    paginationDTO: PaginationDTO
  ): Promise<Record<string, any>> {
    const { moduleName, itemID, newItem } = userDTO;

    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${userDTO.moduleName}`);

    await Item.findOneAndUpdate(
      { "itemData.itemID": itemID },
      { $set: { itemData: newItem } },
      { new: true }
    );

    const newItems = await this.getItemsList(moduleName, paginationDTO);
    await mongoose.connection.close();
    return newItems;
  }

  async getItemVariants(
    userDTO: GetItemVariantsDTO
  ): Promise<Record<string, any>> {
    const { moduleName, itemID } = userDTO;

    const module = await this.findModulesByName(moduleName);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    return this.getItemByID(moduleName, itemID);
  }

  async setVariantStock(userDTO: SetVariantStockDTO): Promise<void> {
    const { moduleName, variantID, itemID, storage } = userDTO;

    const module = await this.findModulesByName(moduleName);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });
    await this.changeVariantStock(moduleName, itemID, variantID, storage);
  }

  async editModule(userDTO: EditModuleDTO): Promise<Record<string, any>> {
    const { moduleID, name, fields } = userDTO;
    console.log({namebefore:name});
    

    const module = await this.findModulesByID(moduleID);

    if (fields)
      throw new HttpException(
        "You can`t edit fields using this request!",
        HttpStatus.BAD_REQUEST
      );

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    if (name) {
      const uniqueName = await this.findModulesByName(name);

      if (uniqueName)
        throw new HttpException(
          "Module with this name is already exists!",
          HttpStatus.CONFLICT
        );
    }
    console.log({name});
    

    return this.moduleModel.findOneAndUpdate(
      { moduleID },
      { $set: { name, fields } },
      { new: true }
    );
  }

  // public updateFields(module: Record<any, any>): void {
  //   const modelFile = join(__dirname, "..", "schemas", `${module.name}.js`);
  //   const fields = { itemID: "string" };
  //
  //   const addFields = () => {
  //     module.fields.forEach((field) => {
  //       fields[field.settings.textPrompt] = ModulesService.validateType(
  //         field.type
  //       );
  //     });
  //   };
  //
  //   fs.stat(modelFile, async (err) => {
  //     if (err) {
  //       addFields();
  //       await this.saveSchema(this.generateSchema(fields, module), modelFile);
  //     } else {
  //       fs.unlinkSync(modelFile);
  //       addFields();
  //       await this.saveSchema(this.generateSchema(fields, module), modelFile);
  //     }
  //   });
  // }

  // private async copyData(moduleName: string): Promise<Record<string, any>> {
  //   await mongoose.connect(process.env.MONGO_URI, options);
  //   const Item = require(`../../schemas/${moduleName}`);
  //
  //   const items = await Item.find();
  //   await mongoose.connection.close();
  //   return items;
  // }
  //
  // private async pasteData(
  //   moduleName: string,
  //   items: Record<string, any>
  // ): Promise<void> {
  //   await mongoose.connect(process.env.MONGO_URI, options);
  //   const Item = require(`../../schemas/${moduleName}`);
  //
  //   for (let item in items)
  //     if (items.hasOwnProperty(item)) {
  //       const newItem = new Item(item);
  //       await newItem.save();
  //     }
  //
  //   await mongoose.connection.close();
  // }

  async getFields(userDTO: ModuleNameDTO): Promise<Record<any, any>> {
    const module = await this.findModulesByName(userDTO);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);
    return module.fields;
  }

  async addField(userDTO: AddFieldsDTO): Promise<Record<string, any>> {
    const { moduleID, name, type, settings } = userDTO;

    // await mongoose.connect(process.env.MONGO_URI, options);

    const module = await this.findModulesByID(moduleID);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const moduleFields = module.fields;
    // const data = await this.copyData(module.name);

    const maxOrderObject =
      moduleFields.length > 0 &&
      moduleFields.reduce(
        (prev, current) => (prev.order > current.order ? prev : current),
        {}
      );

    const createdField = {
      name,
      type,
      settings,
      id: uniqid("f_"),
      order: moduleFields === 0 ? 0 : maxOrderObject.order + 1,
    };
    const newFieldsArr = moduleFields.push(createdField);
    await this.validateFields(moduleFields);

    await this.moduleModel.findOneAndUpdate(
      { moduleID },
      { $set: { fields: moduleFields } },
      { new: true }
    );

    // const updatedModule = await this.moduleModel.findOne({ moduleID });
    // this.updateFields(updatedModule);

    // await mongoose.connect(process.env.MONGO_URI, options);
    // await mongoose.connection.db.dropCollection(module.name);
    //
    // await mongoose.connection.close();
    // await mongoose.connect(process.env.MONGO_URI, options);
    // await this.pasteData(module.name, data);
    // await this.getItemsList(module.name);
    //
    // await mongoose.connection.close();
    return { count: newFieldsArr, fields: moduleFields };
  }

  async editField(userDTO: EditFieldsDTO): Promise<Record<string, any>> {
    const { id, name, type, settings } = userDTO;

    const module = await this.moduleModel.findOne({ "fields.id": id });
    const { fields } = module;

    if (!module)
      throw new HttpException("Field not found!", HttpStatus.NOT_FOUND);

    let idx: number;

    fields.forEach((field, index) => {
      if (field.id === id) idx = index;
    });

    const field = fields[idx];

    fields[idx] = {
      name: !!name ? name : field.name,
      type: !!type ? type : field.type,
      settings: !!settings ? settings : field.settings,
      id,
    };
    const validatedFields = await this.validateFields(fields);

    await this.moduleModel.findOneAndUpdate(
      { moduleID: module.moduleID },
      { $set: { fields } },
      { new: true }
    );

    // const updatedModule = await this.moduleModel.findOne({
    //   moduleID: module.moduleID,
    // });
    // this.updateFields(updatedModule);

    return { count: fields.length, fields: validatedFields };
  }

  async editFieldsOrder(userDTO: EditFieldsOrderDTO) {
    const { moduleID, fields } = userDTO;
    const module = await this.findModulesByID(moduleID);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);
    await this.changeFieldsOrder(module.name, fields, moduleID);
    return this.findModulesByID(moduleID);
  }

  async addItemCategory(
    userDTO: AddItemCategoryDTO
  ): Promise<Record<string, any>> {
    const { moduleName, itemID, categoryID } = userDTO;

    const module = await this.findModulesByName(moduleName);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    await this.changeItemCategories(moduleName, itemID, categoryID);
    return this.getItemCategories({ moduleName, itemID });
  }

  async deleteItemCategory(
    userDTO: DeleteItemCategoryDTO
  ): Promise<Record<string, any>> {
    const { moduleName, itemID, categoryID } = userDTO;

    const module = await this.findModulesByName(moduleName);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    await this.removeItemCategoryByID({ moduleName, itemID, categoryID });
    return this.getItemCategories({ moduleName, itemID });
  }

  async deleteField(userDTO: DeleteFieldsDTO) {
    const module = await this.moduleModel.findOne({ "fields.id": userDTO });
    const { fields } = module;
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    let idx: number;

    fields.forEach((field, index) => {
      if (field.id === userDTO) idx = index;
    });

    fields.splice(idx, 1);

    await this.moduleModel.findOneAndUpdate(
      { "fields.id": userDTO },
      { $set: { fields } },
      { new: true }
    );

    // const updatedModule = await this.moduleModel.findOne({
    //   moduleID: module.moduleID,
    // });
    // this.updateFields(updatedModule);

    return { count: fields.length, fields };
  }

  async uploadFile(
    userDTO: ModuleIDDTO,
    file: any
  ): Promise<Record<string, string>> {
    const { moduleID } = userDTO;

    const imgTypes = [
      "png",
      "jpeg",
      "jpg,",
      "gif",
      "pdf",
      "xls",
      "xlsx",
      "csv",
    ];
    if (!imgTypes.includes(file.mimetype.split("/")[1]))
      throw new HttpException("Wrong format of file!", HttpStatus.BAD_REQUEST);

    const sftp = new Client();

    const config = {
      host: `${process.env.SSH_HOST}`,
      port: `${process.env.SSH_PORT}`,
      username: `${process.env.SSH_USERNAME}`,
      password: `${process.env.SSH_PASS}`,
    };

    const folder = "tempFiles/";
    const remoteFolder = "/home/images/public_html/uploads/moduleFiles/";

    await this.moduleModel.findOneAndUpdate(
      { moduleID },
      { $set: { profileImg: file.filename.split("_")[2] } },
      { new: true }
    );

    await sftp
      .connect(config)
      .then(() => {
        return sftp.uploadDir(folder, remoteFolder);
      })
      .then(() => {
        return sftp.end();
      })
      .catch((err) => {
        console.log(err);
      });

    fs.unlink(file.path, () => {
      console.log("Temp files was deleted!");
    });

    return { message: "File uploaded successfully" };
  }

  async deleteModule(userDTO: DeleteModuleDTO): Promise<Record<string, any>> {
    const module = await this.findModulesByID(userDTO);
    await this.moduleModel.findOneAndDelete({ moduleID: module.moduleID });
    const modulesCount = await this.moduleModel.find().countDocuments()

    const modules = await this.moduleModel.find().limit(10).skip(0)

    return {
      count: modulesCount,
      modules
    };
  }

  async addItemToWishList(userId: string, userDTO: WishListDTO) {
    const user = await this.userService.findUserByUserID(userId);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const item = await this.getItemByID(userDTO.moduleName, userDTO.itemId);
    if (!item) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    const sameItem = user.wishlist.find((el) => {
      return el.itemData.itemID == item.itemData.itemID;
    });
    if (sameItem) {
      throw new HttpException(
        "Same product is already exist in wishlist",
        HttpStatus.BAD_REQUEST
      );
    }
    if (!user.wishlist) {
      user.wishlist = [];
    }
    user.wishlist.push(item);

    if (!item.itemData.likedUsers) {
      item.itemData.likedUsers = [];
    }
    item.itemData.likedUsers.push(user.userID);

    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${userDTO.moduleName}`);
    await Item.findOneAndUpdate({ "itemData.itemID": userDTO.itemId }, item);

    const wishlist = user.wishlist;
    await this.userService.editUser({ userID: userId, wishlist });

    return "Product successfully add to wishlist";
  }

  async addItemToViewed(userId: string, userDTO: WishListDTO) {
    const user = await this.userService.findUserByUserID(userId);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const item = await this.getItemByID(userDTO.moduleName, userDTO.itemId);
    if (!item) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    const sameItem = user.viewed.find((el) => {
      return el.itemData.itemID == item.itemData.itemID;
    });
    if (sameItem) {
      throw new HttpException("", HttpStatus.BAD_REQUEST);
    }
    user.viewed.push(item);
    const viewed = user.viewed;
    await this.userService.editUser({ userID: userId, viewed });
  }

  async removeItemFromWishList(userId: string, userDTO: WishListDTO) {
    const user = await this.userService.findUserByUserID(userId);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const item = await this.getItemByID(userDTO.moduleName, userDTO.itemId);
    if (!item) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    const sameItem = user.wishlist.find((el) => {
      return el.itemData.itemID == item.itemData.itemID;
    });
    if (!sameItem) {
      throw new HttpException(
        "No such product in wishlist",
        HttpStatus.BAD_REQUEST
      );
    }

    if (!item.itemData.likedUsers) item.itemData.likedUsers = [];
    item.itemData.likedUsers = item.itemData.likedUsers.filter(function (
      value
    ) {
      return value != userId;
    });

    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/webshop`);
    await Item.findOneAndUpdate({ itemID: item.itemID }, item);

    // await item.save();

    if (!user.wishlist) user.wishlist = [];
    const wishlist = user.wishlist.filter(function (value) {
      return value.itemData.itemID != userDTO.itemId;
    });

    await this.userService.editUser({ userID: userId, wishlist });
    await mongoose.connection.close();
    return wishlist;
  }

  async markNews(userId: string, userDTO: MarkNewsDTO) {
    let user = await this.userService.findUserByUserID(userId);

    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const { itemID, type } = userDTO;
    let item = await this.getItemByID("news", itemID);

    if (!item) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    user = user.toObject();
    item = item.toObject();

    if (type == "like") {
      user.likedNews?.includes(itemID)
        ? (user.likedNews = user.likedNews.filter((el) => el !== itemID))
        : user.likedNews.push(itemID);
      user.dislikedNews = user.dislikedNews.filter((el) => el !== itemID);

      item.like += Number(user.likedNews?.includes(itemID));

      await this.userService.updateUser(user);

      await this.editItemByID("news", itemID, [item]);

      return { isLiked: user.likedNews?.includes(itemID), likes: item.like };
    }
    if (type == "dislike") {
      user.dislikedNews?.includes(itemID)
        ? (user.dislikedNews = user.dislikedNews.filter((el) => el !== itemID))
        : user.dislikedNews.push(itemID);
      user.likedNews = user.likedNews.filter((el) => el !== itemID);

      item.dislike += Number(user.dislikedNews?.includes(itemID));

      await this.userService.updateUser(user);

      await this.editItemByID("news", itemID, [item]);

      return {
        isDisliked: user.dislikedNews?.includes(itemID),
        dislikes: item.dislike,
      };
    }
  }
}
