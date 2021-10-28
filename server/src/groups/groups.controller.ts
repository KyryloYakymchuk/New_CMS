import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { Model } from "mongoose";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { GroupsService } from "./groups.service";
import { AddGroupDTO, DeleteGroupDTO, EditGroupDTO } from "./dto/groups.dto";
import { Group } from "../types/group";
import { QueryDTO } from "../shared/dto/shared.dto";
import { LoggerGateway } from "../shared/logger/logger.gateway";

export const module = "groups";

@ApiTags("groups")
@Controller("groups")
export class GroupsController {
  constructor(
    @InjectModel("Group") private groupsModel: Model<Group>,
    private groupsService: GroupsService,
    private loggerGateway: LoggerGateway
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async getGroups(@Query() userDTO: QueryDTO): Promise<Record<string, any>> {
    return await this.groupsService.getGroups(userDTO);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async addGroup(
    @Body() userDTO: AddGroupDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    if (userDTO.permissions)
      userDTO.permissions = await this.groupsService.validatePermissions(
        userDTO.permissions
      );

    const result = await this.groupsService.addGroup(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editGroup(
    @Body() userDTO: EditGroupDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    if (userDTO.permissions)
      userDTO.permissions = await this.groupsService.validatePermissions(
        userDTO.permissions
      );

    const result = await this.groupsService.editGroup(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Delete(":groupID")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async deleteGroup(
    @Param("groupID") userDTO: DeleteGroupDTO,
    @Query() queryDTO: QueryDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    const group = await this.groupsService.findGroupByID(req.params.groupID);
    if (!group)
      throw new HttpException("Group not found!", HttpStatus.NOT_FOUND);

    const result = this.groupsService.deleteGroup(userDTO, queryDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }
}
