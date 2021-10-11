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
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  AddPageDTO,
  DeletePageDTO,
  EditPageDTO,
  GetPagesDTO, ResponsePageDto,
} from "./dto/pages.dto";
import { PagesService } from "./pages.service";

@Controller("pages")
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Get()
  async getPages(
    @Query() userDTO: GetPagesDTO
  ): Promise<Record<string, any>> {
    return this.pagesService.getPages(userDTO);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async apiAddPage(
    @Body() userDTO: AddPageDTO
  ): Promise<Record<string, string>> {
    return this.pagesService.addPage(userDTO);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editPage(
    @Body() userDTO: EditPageDTO
  ): Promise<Record<string, string>> {
    return this.pagesService.editPage(userDTO);
  }

  @Delete(":page")
  @UseGuards(AuthGuard("jwt"))
  async deletePage(
    @Param("pageID") page: DeletePageDTO
  ): Promise<Record<string, string>> {
    return this.pagesService.deletePage(page);
  }

  @Get(':id')
  @UseGuards(AuthGuard("jwt"))
  async getOne(@Param('id') id: string): Promise<ResponsePageDto> {
    const page = await this.pagesService.getById(id);
    return new ResponsePageDto(page);
  }
}
