import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Group } from "../types/group";

@Injectable()
export class GuardsService {
  constructor(@InjectModel("Group") private groupModel: Model<Group>) {}

  async pagesWatch(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.pages?.watch;
  }

  async usersWatch(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.users?.watch;
  }

  async groupsWatch(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.groups?.watch;
  }

  async pagesAdd(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.pages?.add;
  }

  async usersAdd(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.users?.add;
  }
  async groupsAdd(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.groups?.add;
  }

  async pagesEdit(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.pages?.edit;
  }

  async usersEdit(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.users?.edit;
  }

  async groupsEdit(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.groups?.edit;
  }

  async pagesDelete(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.pages?.delete;
  }

  async usersDelete(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.users?.delete;
  }

  async groupsDelete(user): Promise<boolean> {
    if (!user) return false;

    const group = await this.groupModel.findOne({ name: user.group });
    return group?.permissions?.groups?.delete;
  }
}
