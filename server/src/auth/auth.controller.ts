import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";

import { UserService } from "../shared/user/user.service";
import {
  NewPasswordDTO,
  EmailDTO,
  LoginDTO,
  RegisterDTO,
} from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { User } from "../types/user";
import { TokenDTO } from "../groups/dto/groups.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  userID;
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDTO: LoginDTO): Promise<Record<string, any>> {
    const user = await this.userService.login(userDTO);
    const payload = {
      userID: user.userID,
    };

    const token = this.authService.signPayload(payload, "24h");
    return { accessToken: `Bearer ${token}`, confirmed: user.confirmed };
  }

  @Post("checkEmail")
  @HttpCode(HttpStatus.FOUND)
  async checkEmail(@Body() userDTO: EmailDTO): Promise<Record<string, any>> {
    const candidate = await this.userModel.findOne({ email: userDTO.email });

    if (!candidate)
      throw new HttpException({ status: false }, HttpStatus.NOT_FOUND);

    return { status: true };
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userDTO: RegisterDTO): Promise<Record<string, any>> {
    const candidate = await this.userService.findUser(userDTO.email);

    if (candidate)
      throw new HttpException(`User is already exists!`, HttpStatus.CONFLICT);

    const user = await this.userService.register(userDTO);
    const payload = {
      userID: user.userID,
      email: user.email,
      confirmed: user.confirmed,
    };
    const hash = this.authService.signPayload(payload, "48h");

    return this.authService.sendEmail(user.userID, hash);
  }

  @Post("register/confirm")
  @HttpCode(HttpStatus.ACCEPTED)
  async confirmUser(@Body() userDTO: TokenDTO): Promise<Record<string, any>> {
    const { token } = userDTO;
    const verified = await this.userService.verifyToken(token);

    if (!verified)
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);

    const user = await this.userService.findUserByID(verified.userID);
    if (!user || user.confirmed)
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);

    await this.userService.setAction(verified.userID);
   
    return this.userService.confirmUser(verified.userID);
  }

  @Post("password")
  @HttpCode(HttpStatus.CREATED)
  async sendResetEmail(
    @Body() userDTO: EmailDTO
  ): Promise<Record<string, any>> {
    const { email } = userDTO;
    const candidate = await this.userService.findUser(email);

    if (!candidate)
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    await this.userService.setAction(candidate.userID);
    const user = await this.userService.findUserByID(candidate.userID);

    const payload = {
      userID: user.userID,
      email: user.email,
      actionDate: user.actionDate,
    };

    const hash = this.authService.signPayload(payload, "48h");

    return this.authService.sendResetEmail(user.userID, hash);
  }

  @Post("password/confirm")
  @HttpCode(HttpStatus.ACCEPTED)
  async resetPassword(
    @Body() userDTO: NewPasswordDTO
  ): Promise<Record<string, any>> {
    const { token, newPassword, newPasswordConfirm } = userDTO;

    if (newPassword !== newPasswordConfirm)
      throw new HttpException(
        { message: "Passwords don`t match!" },
        HttpStatus.BAD_REQUEST
      );

    const verified = await this.userService.verifyToken(token);
    const user = await this.userService.findUserByID(verified.userID);

    if (!verified || Date.parse(verified.actionDate) !== +user.actionDate)
      throw new HttpException(
        { message: "Link expired!" },
        HttpStatus.BAD_REQUEST
      );

    await this.userService.setAction(verified.userID);
    return this.authService.changePassword(verified.userID, newPassword);
  }

  // @Post("googleAuth")
  // @HttpCode(HttpStatus.OK)
  // async googleAuth(@Body() userDTO: TokenDTO): Promise<Record<string, any>> {
  //   const { token } = userDTO;
  //   const verified = await this.userService.verifyToken(token);
  //
  //   if (!verified) {
  //     throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
  //   }
  //
  //   let user = await this.userService.findUser(verified.userEmail);
  //
  //   if (user && !user.confirmed) {
  //     await this.userService.setAction(verified.userID);
  //     return this.userService.confirmUser(verified.userID);
  //   } else {
  //     if (!user) {
  //       const registerDTO = {
  //         email: verified.userEmail,
  //         name: verified.username,
  //       }
  //       user = await this.userService.googleRegister(registerDTO);
  //     }
  //   }
  //
  //   const payload = {
  //     userID: user.userID,
  //     email: user.email,
  //     actionDate: user.actionDate,
  //   };
  //
  //   const newToken = await this.authService.signPayload(payload, "24h");
  //   return { accessToken: `Bearer ${newToken}`, user};
  // }

  // @Get("googleAuth/confirm")
  // @HttpCode(HttpStatus.OK)
  // async confirmGoogleToken(@Body() userDTO: TokenDTO): Promise<void> {
  //
  //   const { token } = userDTO;
  //   const verified = await this.userService.verifyToken(token);
  //
  //   if (!verified) {
  //     throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
  //   }
  // }
}
