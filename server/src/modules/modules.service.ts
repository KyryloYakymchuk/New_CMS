import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
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

import { defFields } from "./constants";

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

  private generateSchema(module: Record<any, any>): string {
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

  async findModulesByName(name: string): Promise<Record<string, any>> {
    return this.moduleModel.findOne({ name });
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
        if (fieldID === field.id) fieldName = field.settings.name;
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
      "coordinates_x",
      "coordinates_y",
      "icon",
      "maxSize",
      "name",
      "title",
      "labels",
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
      throw new HttpException("No items!", HttpStatus.NO_CONTENT);
    }

    return { count: modulesCount.length, modules };
  }

  async createModule(dto: AddModuleDTO): Promise<Record<string, string>> {
    const { name, fields = [], icon, categories } = dto;
    const module = await this.findModulesByName(name);

    if (module) {
      throw new HttpException(
        "This module is already exists!",
        HttpStatus.CONFLICT
      );
    }

    defFields.forEach((e) => fields.unshift(e));

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
    const { limit = 10, offset = 0 } = paginationDTO;

    await mongoose.connect(process.env.MONGO_URI, options);

    const Item = require(`../../schemas/${moduleName}`);

    const items = await Item.find().skip(offset).limit(limit);

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

    let currentItem = await Item.deleteOne({
      "itemData.itemID": itemID,
    });

    if (!currentItem) {
      currentItem = await Item.deleteOne({ itemID });
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

  async changeFieldsOrder(fields: Record<string, any>, moduleID: string) {
    await mongoose.connect(process.env.MONGO_URI, options);

    await this.moduleModel.updateOne({ moduleID }, { fields }, { new: true });
    await mongoose.connection.close();
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
    dto: AddItemDTO,
    files: Record<any, any>,
    body: any,
    paginationDTO: PaginationDTO
  ): Promise<any> {
    const { data } = dto;
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
          model[field.settings.name] = input.value;
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
          fields[field.settings.name] = ModulesService.validateType(field.type);
        });

        await this.saveSchema(this.generateSchema(module), modelFile);
      }

      await saveItem();
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

  async removeItemCategoryByID(dto: DeleteItemCategoryDTO) {
    const { moduleName: itemID, categoryID } = dto;

    await mongoose.connect(process.env.MONGO_URI, options);
    const Item = require(`../../schemas/${dto.moduleName}`);
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
    dto: ModuleNameDTO,
    paginationDTO: PaginationDTO
  ): Promise<Record<string, any>> {
    const file = join(__dirname, "..", "schemas", `${dto}.js`);

    if (!fs.existsSync(file))
      throw new HttpException(
        "Module schema is missing. You need create items first",
        HttpStatus.BAD_REQUEST
      );

    return this.getItemsList(String(dto), paginationDTO);
  }

  async deleteItem(
    dto: DeleteItemDTO,
    paginationDTO: PaginationDTO
  ): Promise<Record<string, any>> {
    const { itemID, moduleName } = dto;

    const isItemExist = await this.getItemByID(moduleName, itemID);

    if (!isItemExist) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }
    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

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
            itemsToEdit[field.settings.name] = input.value;
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

  async editModule(dto: EditModuleDTO): Promise<Record<string, any>> {
    const { moduleID, name, fields, categories } = dto;

    if (fields)
      throw new HttpException(
        "You can`t edit fields using this request!",
        HttpStatus.BAD_REQUEST
      );

    const module = await this.findModulesByID(moduleID);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    if (name && module.name !== name) {
      const uniqueName = await this.findModulesByName(name);

      if (uniqueName)
        throw new HttpException(
          "Module with this name is already exists!",
          HttpStatus.CONFLICT
        );
    }

    return this.moduleModel.updateOne(
      { moduleID },
      { name, categories },
      { new: true }
    );
  }

  async getFields(dto: ModuleNameDTO): Promise<Record<any, any>> {
    const module = await this.findModulesByName(dto.name);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    return module.fields;
  }

  async addField(dto: AddFieldsDTO): Promise<Record<string, any>> {
    const { moduleID, name, type, settings } = dto;

    const module = await this.findModulesByID(moduleID);
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    if (module.fields.find((e) => e.settings.name === settings["name"]))
      throw new HttpException(
        "Field with same name already exists",
        HttpStatus.BAD_REQUEST
      );

    if (name === "dropdown") {
      if (settings["labels"] && settings["values"]) {
        if (
          settings["labels"].split(",").length !==
          String(settings.values).split(",").length
        )
          throw new HttpException(
            "Counts of labels and values are different",
            HttpStatus.BAD_REQUEST
          );
      }
    }
    const moduleFields = module.fields;

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

    return { count: newFieldsArr, fields: moduleFields };
  }

  async editField(dto: EditFieldsDTO): Promise<Record<string, any>> {
    const { id, name, type, settings } = dto;

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

    return { count: fields.length, fields: validatedFields };
  }

  async editFieldsOrder(dto: EditFieldsOrderDTO) {
    const { moduleID, fields } = dto;
    const module = await this.findModulesByID(moduleID);

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    await this.changeFieldsOrder(fields, moduleID);

    return this.findModulesByID(moduleID);
  }

  async addItemCategory(dto: AddItemCategoryDTO): Promise<Record<string, any>> {
    const { moduleName, itemID, categoryID } = dto;

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
    dto: DeleteItemCategoryDTO
  ): Promise<Record<string, any>> {
    const { moduleName, itemID, categoryID } = dto;

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

  async deleteField(dto: DeleteFieldsDTO) {
    const module = await this.moduleModel.findOne({ "fields.id": dto });
    const { fields } = module;
    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    let idx: number;

    fields.forEach((field, index) => {
      if (field.id === dto) idx = index;
    });

    fields.splice(idx, 1);

    await this.moduleModel.findOneAndUpdate(
      { "fields.id": dto },
      { $set: { fields } },
      { new: true }
    );

    return { count: fields.length, fields };
  }

  async uploadFile(
    dto: ModuleIDDTO,
    file: any
  ): Promise<Record<string, string>> {
    const { moduleID } = dto;

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

    const modulesCount = await this.moduleModel.find().countDocuments();
    const modules = await this.moduleModel.find().limit(10).skip(0);

    return {
      count: modulesCount,
      modules,
    };
  }

  async addItemToWishList(userId: string, dto: WishListDTO) {
    const { moduleName, itemId } = dto;

    const user = await this.userService.findUserByUserID(userId);
    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);

    const item = await this.getItemByID(moduleName, itemId);
    if (!item) throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);

    const sameItem = user.wishlist.find(
      (el) => el.itemData.itemID == item.itemData.itemID
    );

    if (sameItem)
      throw new HttpException(
        "Same product is already exist in wishlist",
        HttpStatus.BAD_REQUEST
      );

    if (!user.wishlist) user.wishlist = [];

    user.wishlist.push(item);

    if (!item.itemData.likedUsers) item.itemData.likedUsers = [];

    item.itemData.likedUsers.push(user.userID);

    await mongoose.connect(process.env.MONGO_URI, options);

    const Item = require(`../../schemas/${moduleName}`);
    await Item.findOneAndUpdate({ "itemData.itemID": itemId }, item);

    const wishlist = user.wishlist;
    await this.userService.editUser({ userID: userId, wishlist });

    return "Product successfully add to wishlist";
  }

  async addItemToViewed(userId: string, dto: WishListDTO) {
    const { moduleName, itemId } = dto;

    const user = await this.userService.findUserByUserID(userId);
    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);

    const item = await this.getItemByID(moduleName, itemId);
    if (!item) throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);

    const sameItem = user.viewed.find(
      (el) => el.itemData.itemID == item.itemData.itemID
    );

    if (sameItem) throw new HttpException("", HttpStatus.BAD_REQUEST);

    user.viewed.push(item);
    const viewed = user.viewed;

    await this.userService.editUser({ userID: userId, viewed });
  }

  async removeItemFromWishList(userId: string, dto: WishListDTO) {
    const { moduleName, itemId } = dto;

    const user = await this.userService.findUserByUserID(userId);
    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);

    const item = await this.getItemByID(moduleName, itemId);
    if (!item) throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);

    const sameItem = user.wishlist.find(
      (el) => el.itemData.itemID == item.itemData.itemID
    );
    if (!sameItem)
      throw new HttpException(
        "No such product in wishlist",
        HttpStatus.BAD_REQUEST
      );

    if (!item.itemData.likedUsers) item.itemData.likedUsers = [];

    item.itemData.likedUsers = item.itemData.likedUsers.filter(
      (value) => value !== userId
    );

    await mongoose.connect(process.env.MONGO_URI, options);

    const Item = require(`../../schemas/webshop`);
    await Item.findOneAndUpdate({ itemID: item.itemID }, item);

    if (!user.wishlist) user.wishlist = [];
    const wishlist = user.wishlist.filter(
      (value) => value.itemData.itemID != itemId
    );

    await this.userService.editUser({ userID: userId, wishlist });
    await mongoose.connection.close();

    return wishlist;
  }

  async markNews(userId: string, dto: MarkNewsDTO) {
    let user = await this.userService.findUserByUserID(userId);
    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);

    const { itemID, type } = dto;

    let item = await this.getItemByID("news", itemID);
    if (!item) throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);

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
