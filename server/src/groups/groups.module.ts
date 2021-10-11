import { Module } from "@nestjs/common";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupSchema } from "../models/group.schema";
import { GuardsModule } from "../guards/guards.module";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Group", schema: GroupSchema }]),
    GuardsModule,
    LoggerModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
