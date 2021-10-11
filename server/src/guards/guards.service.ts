import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from '../types/group';

@Injectable()
export class GuardsService {
  constructor(@InjectModel('Group') private groupModel: Model<Group>) {}

  async pagesWatch(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.pages?.watch;
    } else {
      return false;
    }
  }

  async usersWatch(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.users?.watch;
    } else {
      return false;
    }
  }

  async groupsWatch(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.groups?.watch;
    } else {
      return false;
    }
  }

  async pagesAdd(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.pages?.add;
    } else {
      return false;
    }
  }

  async usersAdd(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.users?.add;
    } else {
      return false;
    }
  }
  async groupsAdd(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.groups?.add;
    } else {
      return false;
    }
  }

  async pagesEdit(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.pages?.edit;
    } else {
      return false;
    }
  }

  async usersEdit(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.users?.edit;
    } else {
      return false;
    }
  }

  async groupsEdit(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.groups?.edit;
    } else {
      return false;
    }
  }

  async pagesDelete(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.pages?.delete;
    } else {
      return false;
    }
  }

  async usersDelete(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.users?.delete;
    } else {
      return false;
    }
  }

  async groupsDelete(user): Promise<boolean> {
    if (user) {
      const group = await this.groupModel.findOne({ name: user.group });
      return group?.permissions?.groups?.delete;
    } else {
      return false;
    }
  }
}
