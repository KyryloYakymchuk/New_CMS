import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserService } from "./user/user.service";
import { UserSchema } from "../models/user.schema";
import { LoggerModule } from "../logger/logger.module";
import { TasksService } from "./tasks/tasks.service";
import { LogSchema } from "../models/log.schema";
import { UploaderService } from "./uploader/uploader.service";
import { FuserSchema } from "../models/fuser.schema";
import { FuserService } from "./fuser/fuser.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Fuser", schema: FuserSchema },
      { name: "Log", schema: LogSchema },
    ]),
    forwardRef(() => LoggerModule),
  ],
  providers: [UserService, TasksService, UploaderService, FuserService],
  exports: [UserService, UploaderService],
})
export class SharedModule {}
