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
import { GroupsService } from "./groups.service";
import { AddGroupDTO, DeleteGroupDTO, EditGroupDTO } from "./dto/groups.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Group } from "../types/group";
import { QueryDTO } from "../shared/dto/shared.dto";
import { Request } from "express";
import { LoggerGateway } from "../shared/logger/logger.gateway";
import { AuthGuard } from "@nestjs/passport";

export const module = "groups";

@Controller("groups")
export class GroupsController {
  constructor(
    @InjectModel("Group") private groupsModel: Model<Group>,
    private groupsService: GroupsService,
    private loggerGateway: LoggerGateway
  ) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getGroups(@Query() userDTO: QueryDTO): Promise<Record<string, any>> {
    return await this.groupsService.getGroups(userDTO);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async addGroup(
    @Body() userDTO: AddGroupDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    if (userDTO.permissions) {
      userDTO.permissions = await this.groupsService.validatePermissions(
        userDTO.permissions
      );
      const result = await this.groupsService.addGroup(userDTO);
      await this.loggerGateway.logAction(req, module);
      return result;
    } else {
      const result = await this.groupsService.addGroup(userDTO);
      await this.loggerGateway.logAction(req, module);
      return result;
    }
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editGroup(
    @Body() userDTO: EditGroupDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    if (userDTO.permissions) {
      userDTO.permissions = await this.groupsService.validatePermissions(
        userDTO.permissions
      );

      const result = await this.groupsService.editGroup(userDTO);
      await this.loggerGateway.logAction(req, module);
      return result;
    } else {
      const result = await this.groupsService.editGroup(userDTO);
      await this.loggerGateway.logAction(req, module);
      return result;
    }
  }

  @Delete(":groupID")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async deleteGroup(
    @Param("groupID") userDTO: DeleteGroupDTO,
    @Query() queryDTO: QueryDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    const group = await this.groupsService.findGroupByID(req.params.groupID);
    if (!group) {
      throw new HttpException("Group not found!", HttpStatus.NOT_FOUND);
    }

    const result = this.groupsService.deleteGroup(userDTO, queryDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }
}
