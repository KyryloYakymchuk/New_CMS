import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as uniqid from "uniqid";
import { join } from "path";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";

import { WebshopService } from "./webshop.service";
import {
  AddCategoryDTO,
  CategoryIDDTO,
  EditCategoryDTO,
  GetCategoryDTO,
} from "./dto/categories.dto";
import { CategoryItemsDTO, QueryDTO } from "../shared/dto/shared.dto";
import { LoggerGateway } from "../shared/logger/logger.gateway";
import {
  DeleteVariantDTO,
  EditVariantDTO,
  PaginationDTO,
} from "../modules/dto/modules.dto";

import { AddVariantDTO, GetVariantsDTO } from "../modules/dto/modules.dto";
import { FuserService } from "../shared/fuser/fuser.service";
import {
  AddCommentDTO,
  GetCommentsDTO,
  GetItemDTO,
  LikeCommentDTO,
  ResponseCommentDTO,
  ResponseProductDTO,
  ResponseProductsDTO,
} from "./dto/products.dto";

export let module;

@ApiTags("webshop")
@Controller("webshop")
export class WebshopController {
  constructor(
    private webshopService: WebshopService,
    private loggerGateway: LoggerGateway,
    private userService: FuserService
  ) {}

  // @Get("/categories")
  // async getCategories(
  //   @Query() userDTO: QueryDTO
  // ): Promise<Record<string, any>> {
  //   return this.webshopService.getCategories(userDTO);
  // }

  @Get("/categories")
  async getCategories(
    @Query() userDTO: QueryDTO
  ): Promise<Record<string, any>> {
    return this.webshopService.getCategories(userDTO);
  }

  @Get("/category/:search")
  async getCategory(
    @Param("search") userDTO: GetCategoryDTO
  ): Promise<Record<string, any>> {
    return this.webshopService.getCategory(userDTO);
  }

  @Post("/categories")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: ({ body: { data } }, file: Express.Multer.File, cb) =>
          cb(null, join(__dirname, "..", "uploads", "categoriesImages")),
        filename: ({ body: { data } }, file, cb) =>
          cb(
            null,
            `${JSON.parse(data).name}${uniqid("_")}.${
              file.mimetype.split("/")[1]
            }`
          ),
      }),
    })
  )
  async addCategories(
    @Body() userDTO: AddCategoryDTO,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File[]
  ): Promise<Record<string, any>> {
    module = "category";
    const result = this.webshopService.addCategory(userDTO, file);
    // await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Put("/categories")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: ({ body: { data } }, file: Express.Multer.File, cb) =>
          cb(null, join(__dirname, "..", "uploads", "categoriesImages")),
        filename: ({ body: { data } }, file, cb) =>
          cb(
            null,
            `${JSON.parse(data).categoryID}${uniqid("_")}.${
              file.mimetype.split("/")[1]
            }`
          ),
      }),
    })
  )
  async editCategory(
    @UploadedFile() file: Express.Multer.File[],
    @Body() userDTO: EditCategoryDTO,
    @Query() queryDTO: QueryDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    module = "category";
    const result = this.webshopService.editCategory(userDTO, queryDTO, file);
    // await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Delete("/categories/:categoryID")
  async deleteCategory(
    @Param() userDTO: CategoryIDDTO,
    @Query() queryDTO: QueryDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    module = "category";
    const result = this.webshopService.deleteCategory(userDTO, queryDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Delete("/item/variants")
  // @UseGuards(AuthGuard("jwt"))
  async deleteVariant(@Body() userDTO: DeleteVariantDTO, @Req() req: Request) {
    const result = await this.webshopService.deleteVariant(userDTO);
    // await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Get("/item/variants")
  async getVariant(@Query() userDTO: GetVariantsDTO) {
    const result = await this.webshopService.getVariants(userDTO);
    // await this.loggerGateway.logAction(req, module);

    return result.variants;
  }

  @Post("/item/variants")
  async addVariant(
    @Body() userDTO: AddVariantDTO,
    @Req() req: Request
    // @UploadedFile() files: Express.Multer.File[]
  ) {
    const result = await this.webshopService.addVariant(userDTO);
    // await this.loggerGateway.logAction(req, module);

    return { variantID: result };
  }

  @Put("/item/variants")
  // @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: ({ body: { itemID } }, file: Express.Multer.File, cb) =>
          cb(null, join(__dirname, "..", "uploads", "itemsImages")),
        filename: ({ body: { itemID } }, file, cb) =>
          cb(null, `${itemID}${uniqid("_")}.${file.mimetype.split("/")[1]}`),
      }),
    })
  )
  async editVariant(
    @Body() userDTO: EditVariantDTO,
    @Req() req: Request,
    @UploadedFile() files: Express.Multer.File[]
  ): Promise<Record<string, any>> {
    const newfiles = [files];

    const result = await this.webshopService.editVariant(userDTO, newfiles);
    // await this.loggerGateway.logAction(req, module);
    return result;
  }

  // @Get('/item')
  // // @UseGuards(AuthGuard("jwt"))
  // async getOne(@Body() getItem: GetItemCategoriesDTO): Promise<Record<string, any>> {
  //   const item = await this.webshopService.getItemByID(getItem.moduleName, getItem.itemID);
  //   if (!item){
  //     throw new HttpException('No item by this id', HttpStatus.NOT_FOUND);
  //   }
  //
  //   return new ResponseItemDto(item);
  // }

  @Get("/items")
  // @UseGuards(AuthGuard("jwt"))
  async getItems(
    // @Param("name") userDTO: ModuleNameDTO,
    @Query() paginationDTO: PaginationDTO,
    @Headers("authorization") token?: string
  ): Promise<Record<string, any>> {
    let verified;

    if (token) {
      verified = await this.userService.verifyToken(token.split(" ")[1]);

      if (!verified)
        throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const itemsObj = await this.webshopService.getItems(paginationDTO);

    return {
      count: itemsObj.count,
      items: itemsObj.items.map((el) => {
        const item = new ResponseProductsDTO(el);
        item.isLiked =
          el.likedUsers && token
            ? el.likedUsers.includes(verified.userID)
            : false;
        return item;
      }),
    };
  }

  @Get("/item")
  // @UseGuards(AuthGuard("jwt"))
  async getItem(
    @Query() itemID: GetItemDTO,
    // @Query() paginationDTO: PaginationDTO,
    @Headers("authorization") token?: string
  ): Promise<Record<string, any>> {
    let verified, user;

    if (token) {
      verified = await this.userService.verifyToken(token.split(" ")[1]);
      if (!verified)
        throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);

      user = await this.userService.findUserByUserID(verified.userID);
    }

    const item = await this.webshopService.getItemByID(itemID.itemID);
    const responseProduct = new ResponseProductDTO(item);

    if (user) {
      user.orders.forEach((el) => {
        if (
          el.status == "Completed" &&
          el.products.map((el) => el.itemID == itemID.itemID).includes(true)
        )
          responseProduct.isAlreadyBought = true;
      });
    }

    const mayLike = await this.webshopService.getCategoriesItems(
      { categoryID: item.toObject().categoryID },
      token
    );

    responseProduct.mayLike = mayLike.products;

    if (responseProduct.mayLike.length < 4) {
      const anotherItems = await this.webshopService.getItems({
        limit: 4 - responseProduct.mayLike.length,
      });
      responseProduct.mayLike = responseProduct.mayLike.concat(
        anotherItems.map((el) => new ResponseProductsDTO(el))
      );
    }

    const count = responseProduct.comments.length;
    responseProduct.comments = responseProduct.comments.reverse().slice(0, 3);

    responseProduct.comments = {
      count,
      items: responseProduct.comments.map((el) => {
        el.isLiked =
          !!token &&
          !!(el.likedUsers && el.likedUsers.includes(verified.userID));
        el.isDisliked =
          !!token &&
          !!(el.dislikedUsers && el.dislikedUsers.includes(verified.userID));
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
      }),
    };

    return {
      product: responseProduct,
    };
  }

  @Post("/item/comment")
  async addComment(
    @Body() userDTO: AddCommentDTO,
    @Headers("authorization") token: string
  ) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }
    const result = await this.webshopService.addComment(userDTO, user);

    let responseComments = result.comments;
    const count = responseComments.length;

    responseComments = responseComments
      .reverse()
      .slice(0, userDTO.count ? +userDTO.count : responseComments.length);

    return {
      count,
      items: responseComments.map((el) => {
        el.isLiked =
          !!token &&
          !!(el.likedUsers && el.likedUsers.includes(verified.userID));
        el.isDisliked =
          !!token &&
          !!(el.dislikedUsers && el.dislikedUsers.includes(verified.userID));

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
      }),
    };
  }

  @Get("/item/comment")
  async getComments(
    @Query() userDTO: GetCommentsDTO,
    @Headers("authorization") token?: string
  ) {
    let verified, user;
    if (token) {
      verified = await this.userService.verifyToken(token.split(" ")[1]);
      if (!verified) {
        throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
      }

      user = await this.userService.findUserByUserID(verified.userID);
      if (!user) {
        throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
      }
    }

    const result = await this.webshopService.getComments(userDTO);

    let responseComments = result.comments;
    const count = responseComments.length;

    responseComments = responseComments
      .reverse()
      .slice(
        userDTO.offset ? +userDTO.offset : 0,
        userDTO.limit
          ? +userDTO.limit + (+userDTO.offset || 0)
          : responseComments.length
      );

    return {
      count,
      items: responseComments.map((el) => {
        el.isLiked =
          !!token &&
          !!(el.likedUsers && el.likedUsers.includes(verified.userID));
        el.isDisliked =
          !!token &&
          !!(el.dislikedUsers && el.dislikedUsers.includes(verified.userID));

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
      }),
    };
  }

  @Post("/item/comment/dislike")
  @HttpCode(HttpStatus.OK)
  async dislikeComment(
    @Body() userDTO: LikeCommentDTO,
    @Headers("authorization") token: string
  ) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const comment = await this.webshopService.dislikeComment(userDTO, user);

    comment.isLiked =
      !!token &&
      !!(comment.likedUsers && comment.likedUsers.includes(user.userID));
    comment.isDisliked =
      !!token &&
      !!(comment.dislikedUsers && comment.dislikedUsers.includes(user.userID));

    const dateNow = new Date();
    const elDate = comment.date;
    comment.date =
      Math.floor(
        (dateNow.getTime() - comment.date.getTime()) / (1000 * 60 * 60 * 24)
      ) + " days ago";

    if (comment.date == "0 days ago")
      comment.date =
        Math.floor((dateNow.getTime() - elDate.getTime()) / (1000 * 60 * 60)) +
        " hours ago";

    if (comment.date == "0 hours ago")
      comment.date =
        Math.floor((dateNow.getTime() - elDate.getTime()) / (1000 * 60)) +
        " minutes ago";

    return new ResponseCommentDTO(comment);
  }

  @Post("/item/comment/like")
  @HttpCode(HttpStatus.OK)
  async likeComment(
    @Body() userDTO: LikeCommentDTO,
    @Headers("authorization") token: string
  ) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const comment = await this.webshopService.likeComment(userDTO, user);

    comment.isLiked =
      !!token &&
      !!(comment.likedUsers && comment.likedUsers.includes(user.userID));
    comment.isDisliked =
      !!token &&
      !!(comment.dislikedUsers && comment.dislikedUsers.includes(user.userID));

    const dateNow = new Date();
    const elDate = comment.date;
    comment.date =
      Math.floor(
        (dateNow.getTime() - comment.date.getTime()) / (1000 * 60 * 60 * 24)
      ) + " days ago";

    if (comment.date == "0 days ago")
      comment.date =
        Math.floor((dateNow.getTime() - elDate.getTime()) / (1000 * 60 * 60)) +
        " hours ago";

    if (comment.date == "0 hours ago")
      comment.date =
        Math.floor((dateNow.getTime() - elDate.getTime()) / (1000 * 60)) +
        " minutes ago";

    return new ResponseCommentDTO(comment);
  }

  @Get("/categories/items")
  async getCategoriesItems(
    @Query() userDTO: CategoryItemsDTO,
    @Headers("authorization") token: string
  ): Promise<Record<string, any>> {
    return this.webshopService.getCategoriesItems(userDTO, token);
  }
}
