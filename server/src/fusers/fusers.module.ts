import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FusersController } from "./fusers.controller";
import { SharedModule } from "../shared/shared.module";
import { GuardsModule } from "../guards/guards.module";
import { LoggerModule } from "../logger/logger.module";
import { FuserSchema } from "../models/fuser.schema";
import { FuserService } from "../shared/fuser/fuser.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Fuser", schema: FuserSchema }]),
    SharedModule,
    LoggerModule,
    GuardsModule,
  ],
  controllers: [FusersController],
  providers: [FuserService],
  exports: [],
})
export class FusersModule {}
