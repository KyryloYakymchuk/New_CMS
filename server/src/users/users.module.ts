import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../models/user.schema";
import { SharedModule } from "../shared/shared.module";
import { GuardsModule } from "../guards/guards.module";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    SharedModule,
    LoggerModule,
    GuardsModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
