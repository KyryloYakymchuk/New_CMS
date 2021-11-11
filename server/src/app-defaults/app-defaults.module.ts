import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { GroupsService } from "src/groups/groups.service";
import { GroupSchema } from "../models/group.schema";
import { AppDefaultsService } from "./app-defaults.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Group", schema: GroupSchema }]),
  ],
  providers: [GroupsService, AppDefaultsService],
})

export class AppDefaultsModule {}
