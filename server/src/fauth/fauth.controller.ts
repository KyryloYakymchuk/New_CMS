import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  NewPasswordDTO,
  EmailDTO,
  LoginDTO,
  RegisterDTO,
} from "./dto/fauth.dto";
import { FauthService } from "./fauth.service";
import { TokenDTO } from "../groups/dto/groups.dto";
import { Fuser } from "../types/fuser";
import { FuserService } from "../shared/fuser/fuser.service";

@ApiTags("fauth")
@Controller("fauth")
export class FauthController {
  userID;
  constructor(
    @InjectModel("Fuser") private userModel: Model<Fuser>,
    private userService: FuserService,
    private authService: FauthService
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDTO: LoginDTO): Promise<Record<string, any>> {
    const user = await this.userService.login(userDTO);

    const payload = {
      userID: user.userID,
    };

    const token = this.authService.signPayload(payload, "24h");

    return {
      accessToken: `Bearer ${token}`,
      user: {
        userID: user.userID,
        main: user.userMain,
        contacts: user.contacts,
        address: user.shippingAddress,
      },
      message: "Login successfully",
    };
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userDTO: RegisterDTO): Promise<Record<string, any>> {
    const candidate = await this.userService.findUser(userDTO.email);

    if (candidate)
      throw new HttpException(`User is already exists!`, HttpStatus.CONFLICT);

    const newUser = {
      userMain: {
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        sex: userDTO.sex || "",
      },
      contacts: {
        email: userDTO.email,
        phone: userDTO.phone || "",
      },
      shippingAddress: {
        address1: userDTO.address1 || "",
        address2: userDTO.address2 || "",
      },
      types: {
        news: true,
        discounts: false,
        recommendations: false,
        offers: true,
      },
      connections: {
        email: true,
        viber: true,
        sms: false,
        mobile: false,
        web: true,
      },
      password: userDTO.password,
    };

    const user = await this.userService.register(newUser);

    const payload = {
      userID: user.userID,
      email: user.contacts.email,
      confirmed: user.confirmed,
    };

    const hash = this.authService.signPayload(payload, "48h");
    await this.authService.sendEmail(user.userID, hash);
    return { message: "Confirming message has been sent to the email" };
  }

  @Get("register/confirm/:token")
  @HttpCode(HttpStatus.ACCEPTED)
  async confirmUser(@Param("token") token: string): Promise<string> {
    const verified = await this.userService.verifyToken(token);

    if (!verified)
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);

    const user = await this.userService.findUserByID(verified.userID);

    if (!user || user.confirmed)
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);

    await this.userService.setAction(verified.userID);
    return this.userService.confirmUser(verified.userID);
  }

  @Post("forgotPassword")
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

  @Put("password/reset")
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

    if (!verified || Date.parse(verified.actionDate) !== +user.actionDate) {
      throw new HttpException(
        { message: "Link expired!" },
        HttpStatus.BAD_REQUEST
      );
    }

    await this.userService.setAction(verified.userID);
    return this.authService.changePassword(verified.userID, newPassword);
  }

  @Post("googleAuth")
  @HttpCode(HttpStatus.OK)
  async googleAuth(@Body() userDTO: TokenDTO): Promise<Record<string, any>> {
    const { token } = userDTO;

    const user = await this.authService.googleAuth(token);

    const payload = {
      userID: user["userID"],
      email: user.contacts["email"],
      actionDate: user["actionDate"],
    };

    const newToken = this.authService.signPayload(payload, "24h");

    return {
      accessToken: `Bearer ${newToken}`,
      user: {
        userID: user.userID,
        main: user.userMain,
        contacts: user.contacts,
        address: user.shippingAddress,
      },
      message: "Login successfully",
    };
  }

  @Get("/validateToken/:token")
  @HttpCode(HttpStatus.OK)
  async confirmGoogleToken(@Param("token") token: string): Promise<void> {
    try {
      const verified = await this.userService.verifyToken(token);
    } catch (err) {
      throw new HttpException("Token is invalid", HttpStatus.BAD_REQUEST);
    }
  }

  @Post("facebookAuth")
  @HttpCode(HttpStatus.OK)
  async facebookAuth(@Body() userDTO: TokenDTO): Promise<Record<string, any>> {
    const { token } = userDTO;
    const user = await this.authService.facebookAuth(token);

    const payload = {
      userID: user["userID"],
      email: user.contacts["email"],
      actionDate: user["actionDate"],
    };

    const newToken = this.authService.signPayload(payload, "24h");

    return {
      accessToken: `Bearer ${newToken}`,
      user: {
        userID: user["userID"],
        main: user.userMain,
        contacts: user.contacts,
        address: user.shippingAddress,
      },
      message: "Login successfully",
    };
  }
}
