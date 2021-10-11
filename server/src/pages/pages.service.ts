import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from '../types/page';
import {AddPageDTO, EditPageDTO, GetPagesDTO, ResponsePageDto} from './dto/pages.dto';

@Injectable()
export class PagesService {
  constructor(@InjectModel('Page') private pageModel: Model<Page>) {}

  async getPages(userDTO: GetPagesDTO): Promise<Record<string, any>> {

    const pages =
      !!userDTO.name || !!userDTO.alias
        ? await this.pageModel.find({
            $and: [
              userDTO.name ? { name: { $regex: new RegExp(userDTO.name, 'i') } } : {},
              userDTO.alias ? { email: { $regex: new RegExp(userDTO.alias, 'i') } } : {},
            ],
          })
        : await this.pageModel.find({});

    if (!pages.length) {
      throw new HttpException('Pages not found!', HttpStatus.NOT_FOUND);
    }

    let newPages = [];

    pages.forEach(el => newPages.push(new ResponsePageDto(el)))

    return newPages;
  }

  async addPage(userDTO: AddPageDTO): Promise<Record<string, any>> {
    const page = await this.pageModel.findOne({ name: userDTO.alias });

    if (page) {
      throw new HttpException(
        'This page already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPage = new this.pageModel(userDTO);
    await newPage.save();

    return { message: 'Page created successfully' };
  }

  async editPage(userDTO: EditPageDTO): Promise<Record<string, any>> {
    const page = await this.pageModel.findOne({ name: userDTO.alias });

    if (!page) {
      throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
    }

    await this.pageModel.findOneAndUpdate(
      { name: page.name },
      { $set: userDTO },
      { new: true },
    );

    return { message: 'Page edited successfully!' };
  }

  async deletePage(pageName: any): Promise<Record<string, any>> {
    const page = await this.pageModel.findOne({ name: pageName });

    if (!page) {
      throw new HttpException('Page not found!', HttpStatus.NOT_FOUND);
    }

    await this.pageModel.findOneAndDelete({ name: page.name });
    return { message: 'Page deleted successfully!' };
  }

  async getById(id: string) {
    return this.pageModel.findById(id);
  }
}
