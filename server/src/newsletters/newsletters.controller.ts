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
  UseGuards,
} from "@nestjs/common";
import { NewslettersService } from "./newsletters.service";
import { AuthGuard } from "@nestjs/passport";
import { QueryDTO } from "../shared/dto/shared.dto";
import {
  CreateJobDTO,
  // DeleteJobDTO,
  // EditJobDTO,
  GetJobDTO,
} from "./dto/newsletters.dto";
import { Request } from "express";

@Controller("newsletters")
export class NewslettersController {
  constructor(private newslettersService: NewslettersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getJobs(@Query() userDTO: QueryDTO) {
    return this.newslettersService.findJobs(userDTO);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getJob(@Param("newsletterID") userDTO: GetJobDTO) {
    return this.newslettersService.findJobByID(userDTO);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async createJob(@Body() userDTO: CreateJobDTO, @Req() req: Request) {}

  @Put()
  @UseGuards(AuthGuard("jwt"))
  async editJob(@Body() userDTO/*: EditJobDTO*/, @Req() req: Request) {}

  @Delete(":newsletter")
  @UseGuards(AuthGuard("jwt"))
  async deleteJob(
    @Param("newsletter") userDTO/*: DeleteJobDTO*/,
    @Req() req: Request
  ) {}
}
