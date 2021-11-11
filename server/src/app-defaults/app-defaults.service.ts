import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

import { GroupsService } from "src/groups/groups.service";
import { Group } from "../types/group";

@Injectable()
export class AppDefaultsService {
  constructor(
    private groupsService: GroupsService,
    @InjectModel("Group") private groupModel: Model<Group>
  ) {}

  async addDefaultGroups(): Promise<void> {
    const isExistsAdmin = await this.groupsService.findGroupByName("Admin");

    const adminPermissions = {
      add: true,
      edit: true,
      delete: true,
      watch: true,
    };
    if (!isExistsAdmin)
      this.groupModel.create({
        name: "Admin",
        permissions: {
          users: adminPermissions,
          pages: adminPermissions,
          groups: adminPermissions,
        },
      });

    const isExistsUser = await this.groupsService.findGroupByName("User");

    const userPermissions = {
      add: false,
      edit: false,
      delete: false,
      watch: true,
    };
    if (!isExistsUser)
      this.groupModel.create({
        name: "User",
        permissions: {
          users: userPermissions,
          pages: userPermissions,
          groups: userPermissions,
        },
      });
  }

  async addDefaultFolders(): Promise<void> {
    const uploadsDir = join(__dirname, "..", "uploads");
    if (!existsSync(uploadsDir)) mkdirSync(uploadsDir);

    const profDir = join(__dirname, "..", "uploads", "profileImages");
    if (!existsSync(profDir)) mkdirSync(profDir);
  }

  async initAppWithDefaults(): Promise<void> {
    await this.addDefaultGroups();
  }
}
