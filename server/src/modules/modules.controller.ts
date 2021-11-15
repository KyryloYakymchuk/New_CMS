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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as uniqid from "uniqid";
import { query, Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { join } from "path";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { ModulesService } from "./modules.service";
import {
  AddFieldsDTO,
  AddItemCategoryDTO,
  AddItemDTO,
  AddModuleDTO,
  DeleteFieldsDTO,
  DeleteItemCategoryDTO,
  DeleteItemDTO,
  DeleteItemFromWishListDTO,
  DeleteModuleDTO,
  EditFieldsDTO,
  EditFieldsOrderDTO,
  EditItemDTO,
  EditItemsDTO,
  EditItemsOrderDTO,
  EditModuleDTO,
  EditVariantsOrderDTO,
  FieldsDTO,
  GetItemCategoriesDTO,
  GetItemsCountDTO,
  GetItemsDTO,
  GetItemVariantsDTO,
  MarkNewsDTO,
  ModuleIDDTO,
  ModuleNameDTO,
  PaginationDTO,
  ResponseItemsDTO,
  SetVariantStockDTO,
  WishListDTO,
} from "./dto/modules.dto";
import { LoggerGateway } from "../shared/logger/logger.gateway";
import { QueryDTO } from "../shared/dto/shared.dto";
import { FuserService } from "../shared/fuser/fuser.service";

export const module = "modules";

@ApiTags("modules")
@Controller("modules")
export class ModulesController {
  constructor(
    private moduleService: ModulesService,
    private loggerGateway: LoggerGateway,
    private userService: FuserService
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getModules(@Query() userDTO: QueryDTO): Promise<Record<string, any>> {
    return this.moduleService.getModules(userDTO);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async addModule(
    @Body() dto: AddModuleDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const { name, fields } = dto;

    if (name && name.includes(" ")) {
      throw new HttpException(
        "Name shouldn't have spaces!",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    if (fields) {
      const validated = await this.moduleService.validateFields(fields);

      if (validated) {
        dto.fields = validated;
        const result = await this.moduleService.createModule(dto);

        await this.loggerGateway.logAction(req, module);

        return result;
      }
    } else {
      const result = await this.moduleService.createModule(dto);

      await this.loggerGateway.logAction(req, module);

      return result;
    }
  }

  @Get("/items/:name")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getItems(
    @Param("name") userDTO: ModuleNameDTO,
    @Query() paginationDTO: GetItemsDTO,
    responseFields: FieldsDTO,
    @Headers("authorization") token: string
  ): Promise<Record<string, any>> {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);

    if (!verified)
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);

    const user = await this.userService.findUserByUserID(verified.userID);

    const items = await this.moduleService.getItems(userDTO, paginationDTO);

    if (!items)
      throw new HttpException("Items not found!", HttpStatus.NOT_FOUND);

    if (!responseFields.fields) return items;

    const fields = responseFields?.fields.split(",");

    return {
      count: items.count,
      items: items.items.map((el) => {
        const responseItem = {};
        el = el.toObject();

        fields.forEach((field) => {
          responseItem[field] = el[field];
        });

        if (el.canLike) {
          responseItem["isLiked"] = !!user
            .toObject()
            .likedNews?.includes(el.itemID);
          responseItem["isDisliked"] = !!user
            .toObject()
            .dislikedNews?.includes(el.itemID);
        }

        return responseItem;
      }),
    };
  }

  @Get("/item")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getOne(
    @Body() getItem: GetItemCategoriesDTO
  ): Promise<Record<string, any>> {
    const item = await this.moduleService.getItemByID(
      getItem.moduleName,
      getItem.itemID
    );
    if (!item) {
      throw new HttpException("No item by this id", HttpStatus.NOT_FOUND);
    }

    return item;
  }

  @Get("/items/count")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getCount(
    @Query() getItem: GetItemsCountDTO
  ): Promise<Record<string, any>> {
    const item = await this.moduleService.getItemByID(
      getItem.moduleName,
      getItem.itemID
    );
    if (!item) {
      throw new HttpException("No item by this id", HttpStatus.NOT_FOUND);
    }

    const variant = item.variants.find((el) => {
      return el.variantID == getItem.variantID;
    });
    if (!variant) {
      throw new HttpException("No variant by this id", HttpStatus.NOT_FOUND);
    }

    return {
      count: variant.status === "disabled" ? 0 : variant.quantity,
    };
  }

  @Put("/item/wishlist")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async addItemToWishList(
    @Body() userDTO: WishListDTO,
    @Req() req: Request,
    @Headers("authorization") token: string
  ) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const result = await this.moduleService.addItemToWishList(
      verified.userID,
      userDTO
    );

    return { message: result };
  }

  @Delete("/item/wishlist")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async removeItemFromWishList(
    @Body() userDTO: DeleteItemFromWishListDTO,
    @Req() req: Request,
    @Headers("authorization") token: string
  ) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const result = await this.moduleService.removeItemFromWishList(
      verified.userID,
      userDTO
    );

    const wishlist = result.map((el) => {
      const newEl = new ResponseItemsDTO(el);
      newEl.isLiked = true;
      return newEl;
    });
    const totalCount = wishlist.length;

    if (!userDTO.limit && !userDTO.offset) {
      return { totalCount, items: wishlist };
    }

    if (!userDTO.limit) {
      return {
        totalCount,
        items: wishlist.slice(
          userDTO.offset > 0 ? userDTO.offset : wishlist.length
        ),
      };
    }

    if (!userDTO.offset) {
      return { totalCount, items: wishlist.slice(0, userDTO.limit) };
    }

    return {
      totalCount,
      items: wishlist.slice(
        userDTO.offset,
        userDTO.offset > 0 ? userDTO.offset + userDTO.limit + 1 : userDTO.limit
      ),
    };
  }

  @Put("/item/viewed")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async addItemToViewed(
    @Body() userDTO: WishListDTO,
    @Req() req: Request,
    @Headers("authorization") token: string
  ) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    return await this.moduleService.addItemToViewed(verified.userID, userDTO);
  }

  @Delete("/item")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async deleteItem(
    @Body() userDTO: DeleteItemDTO,
    @Req() req: Request,
    @Query() paginationDTO: PaginationDTO
  ) {
    const result = await this.moduleService.deleteItem(userDTO, paginationDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Post("/item")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (_, __, cb) =>
          cb(null, join(__dirname, "..", "uploads", "itemsImages")),
        filename: ({ body: { data } }, file, cb) =>
          cb(
            null,
            `${JSON.parse(data).moduleID}_${
              file.fieldname.split("-")[0]
            }${uniqid("_")}.${file.mimetype.split("/")[1]}`
          ),
      }),
    })
  )
  async createItem(
    @Body() dto: AddItemDTO,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Query() paginationDTO: PaginationDTO
  ): Promise<Record<string, any>> {
    const { body } = req;

    const result = await this.moduleService.addItem(
      dto,
      files,
      body,
      paginationDTO
    );

    await this.loggerGateway.logAction(req, module);

    return {
      count: result.count,
      items: result.items.map((el) => new ResponseItemsDTO(el)),
    };
  }

  @Put("/item")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async editItem(
    @Body() userDTO: EditItemDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const files = [];
    const result = await this.moduleService.editItem(userDTO, files);

    await this.loggerGateway.logAction(req, module);

    return result;
  }

  @Put("/item/order")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async editItemsOrder(
    @Body() userDTO: EditItemsOrderDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const result = await this.moduleService.editItemsOrder(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Get("/item/categories/:moduleName/:itemID")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getItemCategories(
    @Param() userDTO: GetItemCategoriesDTO
  ): Promise<Record<string, any>> {
    return this.moduleService.getItemCategories(userDTO);
  }

  @Put("/item/categories")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async addItemCategory(
    @Body() userDTO: AddItemCategoryDTO
  ): Promise<Record<string, any>> {
    return this.moduleService.addItemCategory(userDTO);
  }

  @Delete("/item/categories")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async deleteItemCategory(@Body() userDTO: DeleteItemCategoryDTO) {
    return this.moduleService.deleteItemCategory(userDTO);
  }

  @Put("/item/variants/order")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async editVariantsOrder(
    @Body() userDTO: EditVariantsOrderDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const result = await this.moduleService.editVariantsOrder(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Get("/item/variants/:moduleName/:itemID")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getItemVariants(
    @Param() userDTO: GetItemVariantsDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    return this.moduleService.getItemVariants(userDTO);
  }

  @Put("/items")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async editItems(
    @Body() userDTO: EditItemsDTO,
    @Query() paginationDTO: PaginationDTO,
    @Req() req: Request
  ) {
    const result = await this.moduleService.editItems(userDTO, paginationDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put("/item/variants/stock")
  async setVariantStock(@Body() userDTO: SetVariantStockDTO) {
    return this.moduleService.setVariantStock(userDTO);
  }

  @Post("/upload")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: ({ body: { moduleID } }, file: Express.Multer.File, cb) =>
          cb(null, join(__dirname, "..", "uploads", "itemsImages")),
        filename: ({ body: { moduleID } }, file, cb) =>
          cb(null, `${moduleID}${uniqid("_")}.${file.mimetype.split("/")[1]}`),
      }),
    })
  )
  async AddProduct(
    @UploadedFile() file: Express.Multer.File[],
    @Body() userDTO: ModuleIDDTO,
    @Req() req: Request
  ) {
    const result = await this.moduleService.uploadFile(userDTO, file);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Put("/")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editModule(
    @Body() dto: EditModuleDTO,
    @Query() queryDTO: PaginationDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const { name, fields } = dto;

    if (name && name.includes(" ")) {
      throw new HttpException(
        "Name should`nt have spaces!",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    if (fields) {
      const validated = await this.moduleService.validateFields(fields);
      if (validated) dto.fields = validated;
    }

    await this.moduleService.editModule(dto);
    await this.loggerGateway.logAction(req, module);

    return this.moduleService.getModules(queryDTO);
  }

  @Get("fields/:moduleName")
  async getFields(@Param("moduleName") userDTO: ModuleNameDTO) {
    return this.moduleService.getFields(userDTO);
  }

  @Post("fields")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async addFields(
    @Body() dto: AddFieldsDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const result = await this.moduleService.addField(dto);

    await this.loggerGateway.logAction(req, module);

    return result;
  }

  @Put("fields")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editFields(
    @Body() userDTO: EditFieldsDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const result = await this.moduleService.editField(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Put("fields/order")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editFieldsOrder(
    @Body() userDTO: EditFieldsOrderDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const result = await this.moduleService.editFieldsOrder(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Delete("fields/:fieldID")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async deleteFields(
    @Param("fieldID") userDTO: DeleteFieldsDTO,
    @Req() req: Request
  ) {
    const result = await this.moduleService.deleteField(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Delete(":module")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async deleteModule(
    @Param("module") userDTO: DeleteModuleDTO,
    @Req() req: Request
  ) {
    const delModule = await this.moduleService.findModulesByID(userDTO);
    if (!delModule)
      throw new HttpException("Module not found!", HttpStatus.NOT_FOUND);
    await this.loggerGateway.logAction(req, module);
    return await this.moduleService.deleteModule(userDTO);
  }

  @Put("/news/mark")
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async markNews(
    @Headers("authorization") token: string,
    @Body() userDTO: MarkNewsDTO
  ): Promise<Record<string, any>> {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);

    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    return this.moduleService.markNews(verified.userID, userDTO);
  }
}
