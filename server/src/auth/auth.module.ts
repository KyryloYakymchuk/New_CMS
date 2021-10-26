import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { SharedModule } from "../shared/shared.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../models/user.schema";
import { MailModule } from "../mail/mail.module";
import { FuserSchema } from "../models/fuser.schema";
import { FuserService } from "../shared/fuser/fuser.service";
import { FauthService } from "../fauth/fauth.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Fuser", schema: FuserSchema }]),
    SharedModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FauthService, FuserService],
})
export class AuthModule {}
