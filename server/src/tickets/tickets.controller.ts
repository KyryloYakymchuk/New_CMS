import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "path";
import * as uniqid from "uniqid";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { QueryDTO } from "../shared/dto/shared.dto";
import { TicketsService } from "./tickets.service";
import {
  AnswerDTO,
  CreateTicketDTO,
  EditTicketDTO,
  IdDTO,
} from "./dto/tickets.dto";

@ApiTags("tickets")
@ApiBearerAuth()
@Controller("tickets")
export class TicketsController {
  constructor(private TicketsService: TicketsService) {}
  
  @Get("/:ticketID")
  @UseGuards(AuthGuard("jwt"))
  async getTicket(@Param() userDTO: IdDTO,): Promise<any> {
    return this.TicketsService.getById(userDTO);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getTickets(@Query() userDTO: QueryDTO): Promise<any> {    
    return this.TicketsService.getAll(userDTO);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: ({ body }, file: Express.Multer.File, cb) =>
          cb(null, join(__dirname, "..", "uploads", "ticketsFiles")),
        filename: (req, file, cb) => {
          const fileName = `${req.body.email}_${req.body.subject}_${
            file.fieldname.split("-")[0]
          }${uniqid("_")}.${file.mimetype.split("/")[1]}`;
          req.body.fileName = fileName;
          return cb(null, fileName);
        },
      }),
    })
  )
  async createTicket(
    @Body() userDTO: CreateTicketDTO,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
    return this.TicketsService.createTicket(userDTO);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  async editStatus(
    @Body() userDTO: EditTicketDTO,
    @Req() req: Request
  ): Promise<any> {
    return this.TicketsService.editStatus(userDTO);
  }

  @Delete("/:ticketID")
  @UseGuards(AuthGuard("jwt"))
  async deleteTicket(
    @Param() userDTO: IdDTO,
    @Req() req: Request,
    @Query() queryDTO: QueryDTO
  ): Promise<any> {
    return this.TicketsService.deleteTicket(userDTO, queryDTO);
  }

  @Post("/answer")
  @UseGuards(AuthGuard("jwt"))
  async sendAnswer(@Body() userDTO: AnswerDTO): Promise<Record<string, any>> {
    return this.TicketsService.sendAnswer(userDTO);
  }
}
