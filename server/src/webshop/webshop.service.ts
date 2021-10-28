import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as fs from "fs";
import * as shortid from "shortid";
import { join } from "path";
import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

import {
  AddCategoryDTO,
  CategoryIDDTO,
  EditCategoryDTO,
  GetCategoryDTO,
} from "./dto/categories.dto";
import { Category } from "../types/category";
import { CategoryItemsDTO, QueryDTO } from "../shared/dto/shared.dto";
import { UploaderService } from "../shared/uploader/uploader.service";
import {
  DeleteVariantDTO,
  EditVariantsDTO,
  AddVariantDTO,
} from "./dto/variants.dto";
import {
  EditWebshopVariantDTO,
  GetItemCategoriesDTO,
  PaginationDTO,
} from "../modules/dto/modules.dto";
import { FuserService } from "../shared/fuser/fuser.service";
import {
  AddCommentDTO,
  GetCommentsDTO,
  LikeCommentDTO,
  ResponseCommentDTO,
  ResponseProductsDTO,
} from "./dto/products.dto";
import { Fuser } from "../types/fuser";
import { GetVariantsDTO } from "../modules/dto/modules.dto";

@Injectable()
export class WebshopService {
  constructor(
    @InjectModel("Category") private categoryModel: Model<Category>,
    private uploaderService: UploaderService,
    private userService: FuserService
  ) {}

  private async findCategoryByID(
    categoryID: string,
    path: string
  ): Promise<Record<string, any>> {
    const category = await this.categoryModel.findOne({ categoryID });

    if (!category) {
      this.uploaderService.deleteFile(path);

      throw new HttpException("Category not found!", HttpStatus.NOT_FOUND);
    }

    return category;
  }

  // private async displayFullCategories(
  //   categories: Record<string, any>
  // ): Promise<Record<string, any>> {
  //   const getCategory = (arrCategories, categoryID) => {
  //     return arrCategories.find((el) => el.categoryID === categoryID);
  //   };
  //
  //   const getFullCategories = (allCategories, category) => {
  //     if (!category.subcategories.length)
  //       return { categoryID: category.categoryID, name: category.name };
  //
  //     return {
  //       categoryID: category.categoryID,
  //       name: category.name,
  //       subcategories: category.subcategories.map((categoryID) =>
  //         getFullCategories(
  //           allCategories,
  //           getCategory(allCategories, categoryID)
  //         )
  //       ),
  //     };
  //   };
  //
  //   return categories.map((category) =>
  //     getFullCategories(categories, category)
  //   );
  // }
  //
  // private async findCategories(
  //   queryDTO: QueryDTO
  // ): Promise<Record<string, any>> {
  //   const { search, limit, offset } = queryDTO;
  //
  //   const categories = await this.categoryModel.find(
  //     !!search ? { name: { $regex: new RegExp(search, "i") } } : {}
  //   );
  //
  //   const categoriesCount = await this.categoryModel.find(
  //     !!search ? { name: { $regex: new RegExp(search, "i") } } : {}
  //   );
  //
  //   if (categoriesCount.length === 0)
  //     throw new HttpException("Categories not found!", HttpStatus.NOT_FOUND);
  //
  //   return this.displayFullCategories(categories);
  // }
  //
  // async getCategories(userDTO: QueryDTO): Promise<Record<string, any>> {
  //   return this.findCategories(userDTO);
  // }

  async addCategory(
    userDTO: AddCategoryDTO,
    file: Record<any, any>
  ): Promise<Record<string, any>> {
    const data = JSON.parse(userDTO.data);
    const { categoryID, name, description } = data;

    const newCategory = new this.categoryModel({
      name,
      description,
      viewed: 0,
    });

    if (file) this.uploaderService.validateImgType(file);

    if (categoryID) {
      const category = await this.findCategoryByID(categoryID, null);

      if (!category)
        throw new HttpException("Category not found!", HttpStatus.NOT_FOUND);

      const newSubcategory = new this.categoryModel(newCategory);
      await newSubcategory.save();

      if (file) {
        const newImgName = `${uniqid()}.${file.mimetype.split("/")[1]}`;
        this.uploaderService.renameImg(
          file.path,
          "categoriesImages",
          `${newSubcategory.categoryID}_${newImgName}`
        );

        await this.categoryModel.findOneAndUpdate(
          {
            categoryID: newSubcategory.categoryID,
          },
          { $set: { categoryImage: newImgName } },
          { new: true }
        );
      }

      category.subcategories.length > 0
        ? category.subcategories.push(newSubcategory.categoryID)
        : (category.subcategories = [newSubcategory.categoryID]);

      await this.categoryModel.findOneAndUpdate(
        { categoryID },
        { $set: category },
        { new: true }
      );

      return { categoryID: newSubcategory.categoryID };
    } else {
      const category = await this.categoryModel.findOne(userDTO);

      if (category)
        throw new HttpException(
          "This category is already exists!",
          HttpStatus.CONFLICT
        );

      const newParentCategory = new this.categoryModel(newCategory);
      await newParentCategory.save();

      if (file) {
        const newImgName = `${uniqid()}.${file.mimetype.split("/")[1]}`;
        this.uploaderService.renameImg(
          file.path,
          "categoriesImages",
          `${newParentCategory.categoryID}_${newImgName}`
        );

        await this.categoryModel.findOneAndUpdate(
          {
            categoryID: newParentCategory.categoryID,
          },
          { $set: { categoryImage: newImgName } },
          { new: true }
        );
      }

      return { categoryID: newParentCategory.categoryID };
    }
  }

  async editCategory(
    userDTO: EditCategoryDTO,
    queryDTO: QueryDTO,
    file: Record<any, any>
  ) {
    const data = JSON.parse(userDTO.data);
    const { categoryID } = data;

    // await this.findCategoryByID(categoryID, !!file.path ? file.path : null);

    if (file) {
      this.uploaderService.validateImgType(file);

      await this.categoryModel.findOneAndUpdate(
        { categoryID },
        { $set: { categoryImage: file.filename.split("_")[1] } },
        { new: true }
      );
    }

    await this.categoryModel.findOneAndUpdate(
      { categoryID },
      { $set: data },
      { new: true }
    );

    return this.findCategories(queryDTO);
  }

  async deleteCategory(
    userDTO: CategoryIDDTO,
    queryDTO: QueryDTO
  ): Promise<Record<string, any>> {
    const { categoryID } = userDTO;

    const category = await this.categoryModel.findOne(userDTO);

    if (!category)
      throw new HttpException("Category not found!", HttpStatus.NOT_FOUND);

    const otherCategories = await this.categoryModel.find();

    otherCategories.map(async (cat) => {
      const { subcategories } = cat;
      if (subcategories.includes(categoryID)) {
        const idx = subcategories.indexOf(categoryID);
        subcategories.splice(idx, 1);
        await this.categoryModel.findOneAndUpdate(
          { categoryID: cat.categoryID },
          { $set: { subcategories } },
          { new: true }
        );
      }
    });

    await this.categoryModel.findOneAndDelete(userDTO);

    return this.getCategories(queryDTO);
  }

  async getCategory(userDTO: GetCategoryDTO) {
    return this.categoryModel.findOne({
      $or: [
        { name: new RegExp(String(userDTO), "gi") },
        { categoryID: String(userDTO) },
      ],
    });
  }

  async addVariant(
    userDTO: AddVariantDTO
    // files: Record<any, any>
  ): Promise<Record<string, any>> {
    const { itemID } = userDTO;
    const moduleName = "webshop";

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const isItemExist = await this.getItemByID(itemID);
    if (!isItemExist) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    const newVariant = {
      variantID: shortid.generate(),
    };

    await this.addVariantByItemID(moduleName, itemID, newVariant);

    return newVariant.variantID;
  }

  async deleteVariant(userDTO: DeleteVariantDTO): Promise<Record<string, any>> {
    const { itemID, variantID } = userDTO;
    const moduleName = "webshop";

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    await this.deleteVariantByID(moduleName, itemID, variantID);

    const item = await this.getItemByID(itemID);
    return item.variants;
  }

  async getVariants(
    userDTO: GetVariantsDTO
    // files: Record<any, any>
  ): Promise<Record<string, any>> {
    const { itemID } = userDTO;
    const moduleName = "webshop";

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const isItemExist = await this.getItemByID(itemID);
    if (!isItemExist) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require("../../schemas/webshop");
    return Item.findOne({ "itemData.itemID": itemID }).select("variants");
  }

  async editVariant(
    userDTO: EditWebshopVariantDTO,
    files: Record<any, any>
  ): Promise<Record<string, any>> {
    const data = JSON.parse(userDTO.data);
    const { variantID } = data;
    const moduleName = "webshop";

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   autoReconnect: true,
    //   reconnectTries: Number.MAX_VALUE,
    //   reconnectInterval: 1000,
    //   poolSize: 10,
    // });
    // const Item = require(`../../schemas/webshop`);
    // const item = await Item.findOne({
    //   "variants.variantID": variantID,
    // });
    // const variant = item.variants.filter((el) => el.variantID == variantID)[0];
    let newImages = data.images || [];
    if (files) {
      for (let file in files) {
        if (files.hasOwnProperty(file)) {
          newImages.push(files[file].filename);
        }
      }
    }

    const editVariant = {
      variantID,
      name: data.name,
      quantity: +data.quantity,
      werehouse: data.werehouse,
      images: newImages,
      price: +data.price,
      discount: +data.discount || 0,
      tax: +data.tax || 0,
      code: data.code,
      status: "enabled",
    };

    await this.editVariantByID(moduleName, variantID, editVariant);

    // const filesObj = await this.putFilesInObj(files, module);
    // if (!!Object.keys(filesObj).length)
    //   await this.saveImgInDB(module.name, variantID, filesObj);

    return this.getItems();
  }

  async getItemByID(itemID: string): Promise<Record<any, any>> {
    const moduleName = "webshop";
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      poolSize: 10,
    });
    const Item = require(`../../schemas/${moduleName}`);

    return Item.findOne({ "itemData.itemID": itemID });
  }

  async addVariantByItemID(
    name: string,
    itemID: string,
    variant: Record<any, any>
  ): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
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
  }

  async deleteVariantByID(
    name: string,
    itemID: string,
    variantID: string
  ): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${name}`);
    const variant = await Item.findOne({ "variants.variantID": variantID });
    if (variant)
      await Item.findOneAndUpdate(
        { "variants.variantID": variantID },
        { variants: variant.variants.filter((i) => i.variantID !== variantID) }
      );
  }

  async editVariantByID(
    name: string,
    variantID: string,
    variant: Record<string, any>
  ): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
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
  }

  async getItemsList(
    moduleName: string,
    paginationDTO?: PaginationDTO
  ): Promise<Record<any, any>> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${moduleName}`);
    return Item.find(/*!!search ? { name: { $regex: new RegExp(search, "i") } } : {}*/)
      .skip(paginationDTO ? +paginationDTO.offset : "")
      .limit(paginationDTO ? +paginationDTO.limit : "");
  }

  async getItems(paginationDTO?: PaginationDTO): Promise<Record<string, any>> {
    let limit, offset;
    if (paginationDTO) {
      limit = paginationDTO.limit;
      offset = paginationDTO.offset;
    }

    const allowedFilters = ["name", "category"];

    let filter = {};

    for (let option in paginationDTO) {
      if (paginationDTO.hasOwnProperty(option)) {
        if (allowedFilters.includes(option)) {
          if (!paginationDTO[option]) {
            continue;
          }
          if (option === "category") {
            const category = await this.categoryModel.findOne({
              name: paginationDTO[option],
            });
            if (!category) {
              throw new HttpException("No such category", HttpStatus.NOT_FOUND);
            }
            filter["itemData.categoryID"] = category.categoryID;

            continue;
          }
          if (option === "name") {
            filter[`itemData.name`] = new RegExp(paginationDTO[option], "i");
            continue;
          }
          filter[`itemData.${option}`] = paginationDTO[option];
        }
      }
    }

    const Item = require(`../../schemas/webshop`);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      poolSize: 10,
    });

    const items = await Item.find(filter)
      .limit(!!limit ? +limit : 0)
      .skip(!!offset ? +offset : 0);

    const fullItemsList = await Item.find(filter);

    // await mongoose.connection.close();
    return { count: fullItemsList.length, items };
  }

  private async displayFullCategories(
    categories: Record<string, any>
  ): Promise<Record<string, any>> {
    const usedCategories = [];
    const getCategory = (arrCategories, categoryID) => {
      return arrCategories.find((el) => el.categoryID === categoryID);
    };

    const getFullCategories = (allCategories, category) => {
      usedCategories.push(category.categoryID);
      if (!category.subcategories.length)
        return { categoryID: category.categoryID, name: category.name };

      return {
        categoryID: category.categoryID,
        name: category.name,
        subcategories: category.subcategories.map((categoryID) =>
          getFullCategories(
            allCategories,
            getCategory(allCategories, categoryID)
          )
        ),
      };
    };

    return categories
      .map((category) =>
        !usedCategories.includes(category.categoryID)
          ? getFullCategories(categories, category)
          : undefined
      )
      .filter((e) => e);
  }

  private async findCategories(
    queryDTO: QueryDTO
  ): Promise<Record<string, any>> {
    const { search } = queryDTO;

    const categories = await this.categoryModel.find(
      !!search ? { name: { $regex: new RegExp(search, "i") } } : {}
    );

    const categoriesCount = await this.categoryModel.find(
      !!search ? { name: { $regex: new RegExp(search, "i") } } : {}
    );

    if (categoriesCount.length === 0)
      throw new HttpException("Categories not found!", HttpStatus.NOT_FOUND);

    return this.displayFullCategories(categories);
  }

  async getCategories(userDTO: QueryDTO): Promise<Record<string, any>> {
    return this.findCategories(userDTO);
  }

  async addComment(
    userDTO: AddCommentDTO,
    user: Fuser
  ): Promise<Record<string, any>> {
    const { itemID, rating, description, title } = userDTO;
    const moduleName = "webshop";

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const isItemExist = await this.getItemByID(itemID);
    if (!isItemExist) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    let canComment = false;

    user.orders.forEach((el) => {
      if (
        el.status == "Completed" &&
        el.products.map((product) => product.itemID == itemID).includes(true)
      )
        canComment = true;
    });

    if (!canComment)
      throw new HttpException(
        "You cant comment this item",
        HttpStatus.BAD_REQUEST
      );

    const newComment = {
      id: shortid.generate(),
      rating,
      title,
      description,
      name: user.userMain.firstName + " " + user.userMain.lastName,
      likes: 0,
      dislikes: 0,
      avatar: "https://img.icons8.com/cotton/2x/person-male--v2.png",
      date: new Date(),
    };

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${moduleName}`);
    let prevComments = await Item.findOne({ "itemData.itemID": itemID }).select(
      "itemData.comments"
    );

    if (!prevComments) prevComments = [];

    await Item.findOneAndUpdate(
      { "itemData.itemID": itemID },
      { "itemData.comments": [...prevComments.itemData.comments, newComment] }
    );

    return Item.findOne({ "itemData.itemID": itemID }).select(
      "itemData.comments"
    );
  }

  async getComments(userDTO: GetCommentsDTO): Promise<Record<string, any>> {
    const { itemID } = userDTO;
    const moduleName = "webshop";

    if (!module)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const isItemExist = await this.getItemByID(itemID);
    if (!isItemExist) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${moduleName}`);

    return Item.findOne({ "itemData.itemID": itemID }).select(
      "itemData.comments"
    );
  }

  async likeComment(
    userDTO: LikeCommentDTO,
    user: any
  ): Promise<Record<string, any>> {
    const { itemID, commentID } = userDTO;
    const moduleName = "webshop";

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const item = await this.getItemByID(itemID);
    if (!item) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${moduleName}`);
    const prevComments = await Item.findOne({
      "itemData.itemID": itemID,
    }).select("itemData.comments");

    const comments = prevComments.itemData.comments.filter(
      (el) => el.id == commentID
    );
    if (comments.length == 0)
      throw new HttpException("No comment by this id", HttpStatus.NOT_FOUND);

    const comment = comments[0];

    if (comment.likedUsers && comment.likedUsers.includes(user.userID)) {
      comment.likes--;
      comment.likedUsers = comment.likedUsers.filter(
        (item) => item !== user.userID
      );
    } else {
      if (
        comment.dislikedUsers &&
        comment.dislikedUsers.includes(user.userID)
      ) {
        comment.dislikes--;
        comment.dislikedUsers = comment.dislikedUsers.filter(
          (item) => item !== user.userID
        );
      }
      comment.likes++;
      if (!comment.likedUsers) comment.likedUsers = [];
      comment.likedUsers.push(user.userID);
    }

    await Item.findOneAndUpdate(
      { "itemData.itemID": itemID },
      { "itemData.comments": [...prevComments.itemData.comments] },
      {
        new: true,
      }
    );

    return comments[0];
  }

  async dislikeComment(
    userDTO: LikeCommentDTO,
    user: any
  ): Promise<Record<string, any>> {
    const { itemID, commentID } = userDTO;
    const moduleName = "webshop";

    const file = join(__dirname, "..", "schemas", `${moduleName}.js`);

    fs.access(file, async (err) => {
      if (err) {
        throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
      }
    });

    const item = await this.getItemByID(itemID);
    if (!item) {
      throw new HttpException("Item not found!", HttpStatus.NOT_FOUND);
    }

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${moduleName}`);
    const prevComments = await Item.findOne({
      "itemData.itemID": itemID,
    }).select("itemData.comments");

    const comments = prevComments.itemData.comments.filter(
      (el) => el.id == commentID
    );
    if (comments.length == 0)
      throw new HttpException("No comment by this id", HttpStatus.NOT_FOUND);

    const comment = comments[0];

    if (comment.dislikedUsers && comment.dislikedUsers.includes(user.userID)) {
      comment.dislikes--;
      comment.dislikedUsers = comment.dislikedUsers.filter(
        (item) => item !== user.userID
      );
    } else {
      if (comment.likedUsers && comment.likedUsers.includes(user.userID)) {
        comment.likes--;
        comment.likedUsers = comment.likedUsers.filter(
          (item) => item !== user.userID
        );
      }
      if (!comment.dislikedUsers) comment.dislikedUsers = [];
      comment.dislikes++;
      comment.dislikedUsers.push(user.userID);
    }

    await Item.findOneAndUpdate(
      { "itemData.itemID": itemID },
      { "itemData.comments": [...prevComments.itemData.comments] },
      {
        new: true,
      }
    );

    return comments[0];
  }

  async getCategoriesItems(
    userDTO: CategoryItemsDTO,
    token: string
  ): Promise<Record<string, any>> {
    let verified;
    if (token) {
      verified = await this.userService.verifyToken(token.split(" ")[1]);

      if (!verified) {
        throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
      }
    }

    const priceFrom =
      userDTO.price && userDTO.price.from ? +userDTO.price.from : 0;
    const priceTo =
      userDTO.price && userDTO.price.to ? +userDTO.price.to : 1000000;
    const allowedFilters = ["search", "categoryID", "price", "excludedItemID"];

    let filter = {};

    for (let option in userDTO) {
      if (userDTO.hasOwnProperty(option)) {
        if (allowedFilters.includes(option)) {
          if (option === "price") {
            filter["variants"] = {
              $elemMatch: {
                $or: [
                  {
                    $and: [
                      {
                        price: {
                          $gte: userDTO[option].from ? userDTO[option].from : 0,
                          $lte: userDTO[option].to
                            ? userDTO[option].to
                            : 10000000,
                        },
                      },
                      {
                        discount: {
                          $not: { $gt: 0 },
                        },
                      },
                    ],
                  },
                  {
                    discount: {
                      $gte: userDTO[option].from ? userDTO[option].from : 0,
                      $lte: userDTO[option].to ? userDTO[option].to : 10000000,
                    },
                  },
                ],
              },
            };
            continue;
          }
          if (option === "search") {
            if (userDTO[option].color)
              filter["itemData.color"] = {
                $in: userDTO.search.color.toString().split(","),
              };
            if (userDTO[option].shape)
              filter["itemData.shape"] = {
                $in: userDTO.search.shape.toString().split(","),
              };
            continue;
          }

          if (option === "excludedItemID") {
            filter[`itemData.itemID`] = { $ne: userDTO[option] };
          }

          filter[`itemData.${option}`] = userDTO[option];
        }
      }
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      poolSize: 10,
    });
    const Item = require(`../../schemas/webshop`);

    const totalItems = await Item.find(filter);

    const items = await Item.find(filter)
      .skip(userDTO ? +userDTO.offset : "")
      .limit(userDTO ? +userDTO.limit : "");

    return {
      totalCount: totalItems.length,
      products: items.map((el) => {
        let i = 0,
          variantNumber = 0;
        if (userDTO.price?.from || userDTO.price?.to)
          el.variants.forEach((variant) => {
            if (
              (variant.discount <= priceTo && variant.discount >= priceFrom) ||
              (!variant.discount &&
                variant.price <= priceTo &&
                variant.price >= priceFrom)
            ) {
              variantNumber = i;
            }
            i++;
          });
        const item = new ResponseProductsDTO(el, variantNumber);
        item.isLiked =
          el.itemData.likedUsers && token
            ? el.itemData.likedUsers.includes(verified.userID)
            : false;

        return item;
      }),
    };
  }

  async getTotalCountCategoriesItems(
    userDTO: CategoryItemsDTO
  ): Promise<number> {
    const { categoryID } = userDTO;

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/webshop`);
    let items;
    if (!categoryID) items = await Item.find();
    else items = await Item.find({ "itemData.categoryID": categoryID });

    return items.length;
  }

  async getAllItems(
    paginationDTO?: PaginationDTO
  ): Promise<Record<string, any>> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/webshop`);
    return Item.find()
      .skip(paginationDTO.offset ? paginationDTO.offset : 0)
      .limit(paginationDTO.limit ? paginationDTO.limit : 10);
  }

  async getItemCategories(
    userDTO: GetItemCategoriesDTO
  ): Promise<Record<string, any>> {
    const { moduleName: name, itemID } = userDTO;

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${name}`);
    const currentItem = await Item.findOne({ itemID });

    const categories = await this.categoryModel.find({});

    return (
      currentItem?.categories &&
      currentItem.categories.map((item) => {
        const category = categories.find((i) => i.categoryID === item);
        if (category) {
          return {
            categoryID: category.categoryID,
            name: category.name,
          };
        } else return [];
      })
    );
  }
  //
  // async addItemCategory(
  //     userDTO: AddItemCategoryDTO
  // ): Promise<Record<string, any>> {
  //   const { moduleName, itemID, categoryID } = userDTO;
  //
  //   const module = await this.modulesService.findModulesByName(moduleName);
  //
  //   if (!module)
  //     throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);
  //
  //   const file = join(__dirname, "..", "schemas", `${moduleName}.js`);
  //
  //   fs.access(file, (err) => {
  //     if (err) {
  //       throw new HttpException("Schema not found!", HttpStatus.NOT_FOUND);
  //     }
  //   });
  //
  //   await this.changeItemCategories(moduleName, itemID, categoryID);
  //   return this.getItemCategories({ moduleName, itemID });
  // }

  // async removeItemCategoryByID(userDTO: DeleteItemCategoryDTO) {
  //   const { moduleName: userName, itemID, categoryID } = userDTO;
  //
  //   await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  //   const Item = require(`../../schemas/${userDTO.moduleName}`);
  //   const currentItem = await Item.findOne({ itemID });
  //   const newCategories =
  //       currentItem?.categories?.length &&
  //       currentItem.categories.filter((i) => i !== categoryID);
  //   await Item.findOneAndUpdate({ itemID }, { categories: newCategories });
  // }
  //
  // async changeItemCategories(name: string, itemID: string, categoryID: string) {
  //   await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  //   const Item = require(`../../schemas/${name}`);
  //
  //   const currentItem = await Item.findOne({ itemID });
  //   const { categories } = currentItem;
  //
  //   const isCategoryAlreadyExist = categories.includes(categoryID);
  //
  //   if (isCategoryAlreadyExist) {
  //     throw new HttpException("Module not found!", HttpStatus.CONFLICT);
  //   }
  //   categories.push(categoryID);
  //   await Item.findOneAndUpdate({ itemID }, { categories });
  // }

  async getMostPopular(): Promise<Record<string, any>> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/webshop`);
    return Item.find().sort({ "itemData.rating": -1 }).limit(4);
  }

  async getTotalCountItems(): Promise<Record<any, any>> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/webshop.js`);
    const items = await Item.find();
    return items.length;
  }

  async getPopularCategories(): Promise<Record<any, any>> {
    return this.categoryModel.find().sort({ viewed: -1 }).limit(3);
  }

  async viewCategory(userDTO: CategoryIDDTO): Promise<void> {
    let category = await this.categoryModel.findOne(userDTO);

    if (!category) {
      throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
    }
    let newCategory = category.toObject();
    newCategory.viewed++;
    await this.categoryModel.findOneAndUpdate(
      { categoryID: newCategory.categoryID },
      newCategory,
      { new: true }
    );
  }

  createResponseComments(comments: Array<any>, userID: string): Array<any> {
    return comments.map((el) => {
      el.isLiked =
        !!userID && !!(el.likedUsers && el.likedUsers.includes(userID));
      el.isDisliked =
        !!userID && !!(el.dislikedUsers && el.dislikedUsers.includes(userID));

      const dateNow = new Date();
      const elDate = el.date;
      el.date =
        Math.floor(
          (dateNow.getTime() - el.date.getTime()) / (1000 * 60 * 60 * 24)
        ) + " days ago";

      if (el.date == "0 days ago")
        el.date =
          Math.floor(
            (dateNow.getTime() - elDate.getTime()) / (1000 * 60 * 60)
          ) + " hours ago";

      if (el.date == "0 hours ago")
        el.date =
          Math.floor((dateNow.getTime() - elDate.getTime()) / (1000 * 60)) +
          " minutes ago";

      return new ResponseCommentDTO(el);
    });
  }
}
