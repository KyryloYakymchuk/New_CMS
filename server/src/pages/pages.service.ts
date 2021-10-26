import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as uniqid from "uniqid";

import { Page } from "../types/page";
import {
  AddPageDTO,
  EditPageDTO,
  GetPagesDTO,
  PaginationDTO,
  ResponsePageDto,
} from "./dto/pages.dto";

@Injectable()
export class PagesService {
  constructor(@InjectModel("Page") private pageModel: Model<Page>) {}

  async getPages(userDTO: GetPagesDTO): Promise<Record<string, any>> {
    const filter =
      !!userDTO.name || !!userDTO.alias
        ? {
            $and: [
              userDTO.name
                ? { name: { $regex: new RegExp(userDTO.name, "i") } }
                : {},
              userDTO.alias
                ? { email: { $regex: new RegExp(userDTO.alias, "i") } }
                : {},
            ],
          }
        : {};

    const pages = await this.pageModel
      .find(filter)
      .skip(+userDTO.offset || 0)
      .limit(+userDTO.limit || 10);

    const allPages = await this.pageModel.find(filter);

    if (!pages.length) {
      throw new HttpException("Pages not found!", HttpStatus.NOT_FOUND);
    }

    let newPages = [];

    pages.forEach((el) => newPages.push(new ResponsePageDto(el)));

    return { count: allPages.length, pages: newPages };
  }

  async addPage(userDTO: AddPageDTO): Promise<Record<string, any>> {
    const page = await this.pageModel.findOne({ name: userDTO.alias });

    if (page) {
      throw new HttpException(
        "This page already exists!",
        HttpStatus.BAD_REQUEST
      );
    }

    const newPage = new this.pageModel(userDTO);
    newPage.pageID = uniqid();
    await newPage.save();

    return { pageID: newPage.pageID };
  }

  async editPage(userDTO: EditPageDTO): Promise<Record<string, any>> {
    const page = await this.pageModel.findOne({ pageID: userDTO.pageID });

    if (!page) {
      throw new HttpException("Page not found", HttpStatus.NOT_FOUND);
    }

    await this.pageModel.findOneAndUpdate(
      { pageID: userDTO.pageID },
      { $set: userDTO }
    );

    return this.pageModel.find();
  }

  async deletePage(
    pageID: string,
    paginationParameters: PaginationDTO
  ): Promise<Record<string, any>> {
    const page = await this.pageModel.findOne({ pageID });

    if (!page) {
      throw new HttpException("Page not found!", HttpStatus.NOT_FOUND);
    }

    await this.pageModel.findOneAndDelete({ pageID });

    const allItems = await this.pageModel.find();

    return {
      count: allItems.length,
      pages: await this.pageModel
        .find()
        .skip(+paginationParameters?.offset || 0)
        .limit(+paginationParameters?.limit || allItems.length),
    };
  }

  async getById(id: string) {
    return this.pageModel.findById(id);
  }
}
