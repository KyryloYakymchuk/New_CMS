import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FauthController } from "./fauth.controller";
import { SharedModule } from "../shared/shared.module";
import { FauthService } from "./fauth.service";
import { JwtStrategy } from "./jwt.strategy";
import { FuserSchema } from "../models/fuser.schema";
import { FuserService } from "../shared/fuser/fuser.service";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Fuser", schema: FuserSchema }]),
    SharedModule,
    MailModule,
  ],
  controllers: [FauthController],
  providers: [FauthService, JwtStrategy, FuserService],
})
export class FauthModule {}
