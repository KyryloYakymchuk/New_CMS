import { forwardRef, Global, Logger, Module } from "@nestjs/common";
import { LoggerController } from "./logger.controller";
import { LoggerService } from "./logger.service";
import { MongooseModule } from "@nestjs/mongoose";
import { LogSchema } from "../models/log.schema";
import { UserSchema } from "../models/user.schema";
import { GroupSchema } from "../models/group.schema";
import { PageSchema } from "../models/page.schema";
import { ModuleSchema } from "../models/module.schema";
import { LoggerGateway } from "../shared/logger/logger.gateway";
import { SharedModule } from "../shared/shared.module";
import { CategorySchema } from "../models/category.schema";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Log", schema: LogSchema },
      { name: "User", schema: UserSchema },
      { name: "Group", schema: GroupSchema },
      { name: "Page", schema: PageSchema },
      { name: "Module", schema: ModuleSchema },
      { name: "Category", schema: CategorySchema },
    ]),
    forwardRef(() => SharedModule),
  ],
  controllers: [LoggerController],
  providers: [LoggerService, LoggerGateway],
  exports: [LoggerService, LoggerGateway],
})
export class LoggerModule {}
