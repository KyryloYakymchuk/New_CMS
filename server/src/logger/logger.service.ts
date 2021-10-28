import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import mongoose from "mongoose";

import { Log } from "../types/log";
import { GetLogsDTO, LoggerDTO } from "./dto/logger.dto";
import { User } from "../types/user";
import { Fuser } from "../types/fuser";
import { Group } from "../types/group";
import { Page } from "../types/page";
import { Module } from "../types/module";
import { Category } from "../types/category";

@Injectable()
export class LoggerService {
  constructor(
    @InjectModel("Log") private logModel: Model<Log>,
    @InjectModel("User") private userModel: Model<User>,
    @InjectModel("Fuser") private fuserModel: Model<Fuser>,
    @InjectModel("Group") private groupModel: Model<Group>,
    @InjectModel("Page") private pageModel: Model<Page>,
    @InjectModel("Module") private moduleModel: Model<Module>,
    @InjectModel("Category") private categoryModel: Model<Category>
  ) {}

  private async verifyToken(token: string): Promise<any> {
    return verify(token, process.env.SECRET_KEY);
  }

  async getLogs(userDTO: GetLogsDTO) {
    const {
      search,
      from,
      to,
      limit,
      offset,
      sortParameter,
      sortField,
    } = userDTO;

    const searching =
      !!search || !!from || !!to
        ? {
            $and: [
              !!search
                ? {
                    $or: [
                      { username: new RegExp(search, "gi") },
                      { userEmail: new RegExp(search, "gi") },
                      { module: new RegExp(search, "gi") },
                    ],
                  }
                : {},
              !!from ? { date: { $gte: new Date(from) } } : {},
              !!to ? { date: { $lte: new Date(to) } } : {},
            ],
          }
        : {};

    const logs = await this.logModel
      .find(searching)
      .sort({ _id: -1, [sortField]: sortParameter })
      .limit(!!limit ? +limit : 10)
      .skip(!!offset ? +offset : 0);

    const logsCount = await this.logModel.find(searching);

    return { count: logsCount.length, logs };
  }

  async detectName(userDTO: LoggerDTO) {
    const { req, module } = userDTO;
    const { body, params, url } = req;

    switch (module) {
      case "groups":
        if (body.name) return body.name;
        else if (body.groupID || params.groupID) {
          const currentGroup = await this.groupModel.findOne({
            groupID: !!body.groupID ? body.groupID : params.groupID,
          });
          return currentGroup.name;
        }
        break;
      case "users":
        if (body.name) return body.name;
        else if (body.userID || params.userID) {
          const currentUser = await this.userModel.findOne({
            userID: !!body.userID ? body.userID : params.userID,
          });
          return currentUser.name;
        }
        break;
      case "pages":
        if (body.name) return body.name;
        else if (body.pageID || params.pageID) {
          const currentPage = await this.pageModel.findOne({
            pageID: !!body.pageID ? body.pageID : params.pageID,
          });
          return currentPage.pageTitle;
        }
        break;
      case "webshop":
        if (req.method == "POST") return body.name;
        else if (req.method == "PUT") {
          if (body.data) {
            const currentCategory = await this.categoryModel.findOne({
              categoryID: JSON.parse(body.data).categoryID,
            });
            return currentCategory.name;
          } else return body.categoryID;
        } else if (body.categoryID || params.categoryID) {
          const currentCategory = await this.categoryModel.findOne({
            categoryID: !!body.categoryID ? body.categoryID : params.categoryID,
          });
          return currentCategory.name;
        }
        break;
      case "category":
        if (body.name) return `${module} ${body.name} in webshop`;
        if (body.data) {
          const currentCategory = await this.categoryModel.findOne({
            categoryID: !!body.categoryID ? body.categoryID : params.categoryID,
          });
          return `${module} ${currentCategory.name} in webshop`;
        }
        break;
      case "variants":
        if (!body.variantID) return `new variant in webshop`;
        let variantName = "";

        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
        });
        const Item = require(`../../schemas/webshop`);
        const item = await Item.findOne({ "itemData.itemID": body.itemID });

        item.variants.forEach((el) => {
          if (el.variantID == body.variantID) variantName = el.name;
        });

        return `variant ${variantName} of item ${item.itemData.name} in module webshop`;
      case "newsletter":
        if (body.name) return body.name;
        break;
      case "modules":
        if (body.name && !url.includes("fields") && !url.includes("items"))
          return body.name;
        else if (body.moduleID || params.moduleID) {
          const currentModule = await this.moduleModel.findOne({
            moduleID: !!body.moduleID ? body.moduleID : params.moduleID,
          });
          if (url.includes("fields"))
            return `field ${body.id} in ${currentModule.name}`;
          else if (url.includes("item")) {
            if (body.itemID) {
              await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
              });
              const Item = require(`../../schemas/${currentModule.name}`);
              const item = await Item.findOne({ itemID: body.itemID });
              return `item ${item.name} from module ${currentModule.name}`;
            } else if (body.data) {
              let itemName: string;
              JSON.parse(body.data).forEach((field) => {
                if (field.id === "f_name") {
                  itemName = field.value;
                }
              });
              return `item ${itemName} from module ${currentModule.name}`;
            }
          } else return currentModule.name;
        }
        break;
      default:
        throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);
    }
  }

  async formAction(userDTO: LoggerDTO) {
    const { req, module } = userDTO;
    const { method, headers } = req;

    const verified = await this.verifyToken(
      headers["authorization"].split(" ")[1]
    );

    const user = await this.userModel.findOne({ userID: verified.userID });
    const fuser = await this.fuserModel.findOne({ userID: verified.userID });

    if (!user && !fuser)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);

    const methodAction = {
      POST: "Created",
      PUT: "Updated",
      DELETE: "Deleted",
    };

    const moduleID = await this.detectName(userDTO);

    const action = `${methodAction[method]} ${moduleID}`;

    return {
      userID: verified.userID,
      userEmail: user?.email || fuser.contacts.email,
      username: user?.name || fuser.userMain.firstName,
      module,
      action,
    };
  }

  async saveLog(userDTO: LoggerDTO) {
    const logObj = await this.formAction(userDTO);
    const newLog = new this.logModel(logObj);
    await newLog.save();
    return newLog;
  }
}
