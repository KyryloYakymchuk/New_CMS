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
  DeleteJobDTO,
  EditJobDTO,
  GetJobDTO,
} from "./dto/newsletters.dto";
import { Request } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

export const module = "newsletters";

@ApiTags("newsletters")
@ApiBearerAuth()
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
  async createJob(
    @Body() userDTO: CreateJobDTO,
    @Req() req: Request
  ): Promise<string> {
    return this.newslettersService.createJob(userDTO);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  async editJob(
    @Body() userDTO: EditJobDTO,
    @Req() req: Request
  ): Promise<string> {
    return this.newslettersService.updateJob(userDTO);
  }

  @Delete(":newsletter")
  @UseGuards(AuthGuard("jwt"))
  async deleteJob(
    @Param("newsletter") userDTO: DeleteJobDTO,
    @Query() queryDTO: QueryDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    return this.newslettersService.deleteJob(userDTO, queryDTO);
  }
}
