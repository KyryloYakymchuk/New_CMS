import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as fs from "fs";

import { UserService } from "../shared/user/user.service";
import { User } from "../types/user";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private userService: UserService,
    private mailService: MailService
  ) {}

  signPayload(payload: any, time: string): string {
    return sign(payload, "secretKey", { expiresIn: time });
  }

  async validateUser(payload: any): Promise<Record<string, any>> {
    return this.userModel.findOne({ userID: payload.userID });
  }

  async sendEmail(userID: string, hash: any): Promise<Record<string, any>> {
    const user = await this.userService.findUserByID(userID);

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    const mail = fs.readFileSync(
      "./src/mail/templates/mailConfirm.html",
      "utf8"
    );

    const newMail = () => {
      const repOne = mail.replace(
        /pageUrl/,
        `${process.env.BASE_URL}auth/register/confirm`
      );
      return repOne.replace(/token/, `${hash}`);
    };

    await this.mailService.sendMail({
      from: '"CMS" <ochkodym@gmail.com>',
      to: user.email,
      subject: "Confirm your account",
      text: `Confirm your account by clicking link below!`,
      html: newMail(),
    });

    return { pageToken: hash };
  }

  async sendResetEmail(
    userID: string,
    hash: any
  ): Promise<Record<string, string>> {
    const user = await this.userService.findUserByID(userID);

    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);

    const mail = fs.readFileSync("./src/mail/templates/mailReset.html", "utf8");
    const newMail = () => {
      const repOne = mail.replace(
        /pageUrl/,
        `${process.env.BASE_URL}auth/resetPassword`
      );
      return repOne.replace(/token/, `${hash}`);
    };

    await this.mailService.sendMail({
      from: '"CMS" <ochkodym@gmail.com>',
      to: user.email,
      subject: "Reset your password",
      html: newMail(),
    });

    return { pageToken: hash };
  }

  async changePassword(
    userID: any,
    newPassword: string
  ): Promise<Record<string, string>> {
    const user = await this.userService.findUserByID(userID);

    const hashed = await bcrypt.hash(newPassword, 10);

    if (!user) return { message: "Password changed successfully!" };

    await this.userModel.findOneAndUpdate(
      { userID: userID },
      {
        $set: {
          password: hashed,
        },
      },
      { new: true }
    );
  }
}
