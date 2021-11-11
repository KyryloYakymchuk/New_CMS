import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Group, Permissions } from "../types/group";
import { AddGroupDTO, DeleteGroupDTO, EditGroupDTO } from "./dto/groups.dto";
import { QueryDTO } from "../shared/dto/shared.dto";

@Injectable()
export class GroupsService {
  constructor(@InjectModel("Group") private groupModel: Model<Group>) {}

  async findGroupByName(groupName: string): Promise<Record<string, any>> {
    return this.groupModel.findOne({
      name: new RegExp(groupName, "gi"),
    });
  }

  async findGroupByID(groupID: any): Promise<Record<string, any>> {
    const group = await this.groupModel.findOne({ groupID });

    if (!group)
      throw new HttpException("Group not found!", HttpStatus.NO_CONTENT);

    return group;
  }

  async validatePermissions(
    permissionsObject: Permissions
  ): Promise<Record<any, any>> {
    const { groups, pages, users } = permissionsObject;
    const allowedNames = ["groups", "pages", "users"];
    const allowedValues = ["add", "edit", "delete", "watch"];

    if (!groups && !pages && !users)
      throw new HttpException(
        "Wrong format of permissions!",
        HttpStatus.NOT_ACCEPTABLE
      );

    const objNames = Object.keys(permissionsObject);
    objNames.forEach((name) => {
      if (!allowedNames.includes(name))
        throw new HttpException(
          "Wrong format of names of permissions!",
          HttpStatus.NOT_ACCEPTABLE
        );

      const objValues = Object.keys(permissionsObject[name]);
      objValues.forEach((value) => {
        if (!allowedValues.includes(value)) {
          throw new HttpException(
            "Wrong format of values of permissions!",
            HttpStatus.NOT_ACCEPTABLE
          );
        }
      });
    });

    return {
      groups: {
        add: (groups && groups.add) || false,
        delete: (groups && groups.delete) || false,
        edit: (groups && groups.edit) || false,
        watch: (groups && groups.watch) || false,
      },
      pages: {
        add: (pages && pages.add) || false,
        delete: (pages && pages.delete) || false,
        edit: (pages && pages.edit) || false,
        watch: (pages && pages.watch) || false,
      },
      users: {
        add: (users && users.add) || false,
        delete: (users && users.delete) || false,
        edit: (users && users.edit) || false,
        watch: (users && users.watch) || false,
      },
    };
  }

  async getGroups(userDTO: QueryDTO): Promise<Record<string, any>> {
    const { search, limit, offset, sortField, sortParameter } = userDTO;

    const groups = await this.groupModel
      .find(!!search ? { name: { $regex: new RegExp(search, "i") } } : {})
      .sort({ [sortField]: sortParameter })
      .limit(!!limit ? +limit : 10)
      .skip(!!offset ? +offset : 0);

    const groupsCount = await this.groupModel.find(
      !!search ? { name: { $regex: new RegExp(search, "i") } } : {}
    );

    if (groupsCount.length === 0)
      throw new HttpException("Groups not found!", HttpStatus.NOT_FOUND);

    return { count: groupsCount.length, groups };
  }

  async addGroup(userDTO: AddGroupDTO): Promise<Record<string, string>> {
    const group = await this.groupModel.findOne({ name: userDTO.name });

    if (group) {
      throw new HttpException(
        "This group already exists!",
        HttpStatus.CONFLICT
      );
    }

    const newGroup = new this.groupModel(userDTO);
    await newGroup.save();

    return { message: "Group created successfully!" };
  }

  async editGroup(userDTO: EditGroupDTO): Promise<Record<string, string>> {
    const { groupID, name } = userDTO;
    const group = await this.findGroupByID(groupID);

    if (!group) {
      throw new HttpException(
        "This group doesn`t exists!",
        HttpStatus.NOT_FOUND
      );
    }

    if (name) {
      const uniqName = await this.findGroupByName(name);

      if (uniqName) {
        throw new HttpException(
          "Group with this name is already exists!",
          HttpStatus.CONFLICT
        );
      }
    }

    await this.groupModel.findOneAndUpdate(
      { groupID },
      { $set: userDTO },
      { new: false }
    );

    return { message: "Group edited successfully!" };
  }

  async deleteGroup(
    userDTO: DeleteGroupDTO,
    queryDTO: QueryDTO
  ): Promise<Record<string, any>> {
    const { search, limit, offset } = queryDTO;

    const group = await this.findGroupByID(userDTO);

    await this.groupModel.findOneAndDelete({ groupID: group.groupID });

    const newGroups = await this.groupModel
      .find(!!search ? { name: { $regex: new RegExp(search, "i") } } : {})
      .limit(!!limit ? +limit : 10)
      .skip(!!offset ? +offset : 0);
    const newGroupsCount = await this.groupModel.find(
      !!search ? { name: { $regex: new RegExp(search, "i") } } : {}
    );

    return { count: newGroupsCount.length, groups: newGroups };
  }
}
