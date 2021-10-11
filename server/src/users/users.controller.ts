import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "../shared/user/user.service";
import { DeleteUserDTO, EditUserDTO } from "./dto/users.dto";
import { RegisterDTO, UserIDDTO } from "../auth/dto/auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../types/user";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AuthGuard } from "@nestjs/passport";
import * as uniqid from "uniqid";
import { QueryDTO } from "../shared/dto/shared.dto";
import { Request } from "express";
import { LoggerGateway } from "../shared/logger/logger.gateway";
import { join } from "path";

export const module = "users";

@Controller("users")
export class UsersController {
  constructor(
    private userService: UserService,
    private loggerGateway: LoggerGateway,
    @InjectModel("User") private userModel: Model<User>
  ) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getUsers(@Query() userDTO: QueryDTO): Promise<Record<string, any>> {
    return this.userService.getUsers(userDTO);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async addUser(
    @Body() userDTO: RegisterDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    const result = await this.userService.register(userDTO);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Post("/img")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor("img", {
      storage: diskStorage({
        destination: ({ body: { userID } }, file: Express.Multer.File, cb) =>
          cb(null, join(__dirname, "..", "uploads", "profileImages")),
        filename: ({ body: { userID } }, file, cb) =>
          cb(null, `${userID}${uniqid("_")}.${file.mimetype.split("/")[1]}`),
      }),
    })
  )
  async setProfileImg(
    @UploadedFile() file: Express.Multer.File[],
    @Body() userDTO: UserIDDTO,
    @Req() req: Request
  ): Promise<Record<string, any>> {
    const result = await this.userService.setProfileImg(userDTO, file);
    await this.loggerGateway.logAction(req, module);
    return result;
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editUser(
    @Body() userDTO: EditUserDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    if (userDTO.password) {
      userDTO.password = await this.userService.cryptPass(userDTO.password);
      const result = await this.userService.editUser(userDTO);
      await this.loggerGateway.logAction(req, module);
      return result;
    } else {
      const result = await this.userService.editUser(userDTO);
      await this.loggerGateway.logAction(req, module);
      return result;
    }
  }

  @Delete(":userID")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async deleteUser(
    @Param("userID") userID: DeleteUserDTO,
    @Query() userDTO: QueryDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    const user = await this.userService.findUserByID(userID);
    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    await this.loggerGateway.logAction(req, module);
    return this.userService.deleteUser(userID, userDTO);
  }
}
