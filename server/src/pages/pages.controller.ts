import {
  Controller,
  UseGuards,
  Body,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  Param,
  Get,
  Query,
  Req,
  Headers,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

import {
  AddPageDTO,
  EditPageDTO,
  GetPagesDTO,
  PaginationDTO,
  ResponsePageDto,
} from "./dto/pages.dto";
import { PagesService } from "./pages.service";
import { LoggerGateway } from "../shared/logger/logger.gateway";

const module = "pages";

@ApiTags("pages")
@Controller("pages")
export class PagesController {
  constructor(
    private pagesService: PagesService,
    private loggerGateway: LoggerGateway
  ) {}

  @Get()
  async getPages(@Query() userDTO: GetPagesDTO): Promise<Record<string, any>> {
    return this.pagesService.getPages(userDTO);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async apiAddPage(
    @Body() userDTO: AddPageDTO,
    @Req() req: Request,
    @Headers("authorization") token
  ): Promise<Record<string, string>> {
    await this.loggerGateway.logAction(req, module);
    return this.pagesService.addPage(userDTO);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editPage(
    @Body() userDTO: EditPageDTO,
    @Req() req: Request,
    @Headers("authorization") token: string
  ): Promise<Record<string, string>> {
    await this.loggerGateway.logAction(req, module);
    const pages = await this.pagesService.editPage(userDTO);
    return pages.map((el) => new ResponsePageDto(el));
  }

  @Delete(":pageID")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async deletePage(
    @Param("pageID") page: string,
    @Req() req: Request,
    @Query() paginationParameters: PaginationDTO
  ): Promise<Record<string, string>> {
    await this.loggerGateway.logAction(req, module);
    return this.pagesService.deletePage(page, paginationParameters);
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getOne(
    @Param("id") id: string,
    @Headers("authorization") token: string
  ): Promise<ResponsePageDto> {
    const page = await this.pagesService.getById(id);
    return new ResponsePageDto(page);
  }
}
