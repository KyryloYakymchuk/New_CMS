import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import * as cron from "node-cron";
import { verify } from "jsonwebtoken";
import { join } from "path";

import { User } from "../../types/user";
import { LoginDTO, RegisterDTO, UserIDDTO } from "../../auth/dto/auth.dto";
import { DeleteUserDTO, EditUserDTO } from "../../users/dto/users.dto";
import { QueryDTO } from "../dto/shared.dto";
import { UploaderService } from "../uploader/uploader.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private uploaderService: UploaderService
  ) {}

  private static sanitizeUser(user: User): Record<any, any> {
    return user.depopulate("password");
  }

  async findUser(email: string): Promise<any> {
    return this.userModel.findOne({ email });
  }

  async findUserByID(userID: any): Promise<any> {
    const user = await this.userModel.findOne({ userID });
    if (!user)
      throw new HttpException("User not found!", HttpStatus.BAD_REQUEST);

    return user;
  }

  async register(userDTO: RegisterDTO): Promise<Record<string, any>> {
    const { email } = userDTO;
    const user = await this.findUser(email);
    if (user)
      throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST);

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();

    const deleteTask = await cron.schedule("* * 2 * *", () => {
      if (user.confirmed === false) {
        this.userModel.deleteOne({ email });
      }

      deleteTask.destroy();
    });

    return UserService.sanitizeUser(createdUser);
  }

  async login(userDTO: LoginDTO): Promise<Record<any, any>> {
    const { email, password } = userDTO;

    const user = await this.findUser(email);
    if (!user)
      throw new HttpException(
        "User with this email doesnt exists!",
        HttpStatus.BAD_REQUEST
      );

    if (!user.confirmed)
      throw new HttpException(
        "Your account not confirmed",
        HttpStatus.BAD_REQUEST
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException("Wrong password!", HttpStatus.UNAUTHORIZED);

    return UserService.sanitizeUser(user);
  }

  async verifyToken(token: string): Promise<any> {
    return verify(token, process.env.SECRET_KEY);
  }

  async confirmUser(userID: string): Promise<Record<string, string>> {
    await this.userModel.findOneAndUpdate(
      { userID },
      { $set: { confirmed: true } },
      { new: true }
    );

    return { message: "User confirmed successfully!" };
  }

  async getUsers(userDTO: QueryDTO): Promise<Record<string, any>> {
    const { search, limit, offset, sortField, sortParameter } = userDTO;

    const query = {};

    if (search)
      query["$or"] = [
        { name: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
      ];

    const users = await this.userModel
      .find(query)
      .select(
        "userID email name lastname phone birthday group confirmed registerDate profileImg"
      )
      .sort({ [sortField]: sortParameter })
      .limit(!!limit ? +limit : 10)
      .skip(!!offset ? +offset : 0);

    const usersCount = await this.userModel.find(query);

    if (usersCount.length === 0) {
      throw new HttpException("Users not found!", HttpStatus.NOT_FOUND);
    }

    return { count: usersCount.length, users };
  }

  async editUser(userDTO: EditUserDTO): Promise<Record<string, string>> {
    const { userID } = userDTO;
    await this.findUserByID(userID);

    await this.userModel.findOneAndUpdate(
      { userID },
      { $set: userDTO },
      { new: true }
    );

    return { message: "User edited successfully!" };
  }

  async deleteUser(
    userID: DeleteUserDTO,
    userDTO: QueryDTO
  ): Promise<Record<string, any>> {
    const { search, limit, offset } = userDTO;
    const user = await this.findUserByID(userID);

    if (user.profileImg !== null) {
      const path = join(
        __dirname,
        "..",
        "uploads",
        "profileImages",
        `${userID + "_" + user.profileImg}`
      );
      this.uploaderService.deleteFile(path);
    }

    await this.userModel.findOneAndDelete({ email: user.email });

    const query = {};

    if (search) {
      query["$or"] = [
        { name: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
      ];
    }

    const newUsers = await this.userModel
      .find(query)
      .select(
        "userID email name lastname phone birthday group confirmed registerDate profileImg"
      )
      .limit(!!limit ? +limit : 10)
      .skip(!!offset ? +offset : 0);
    const newUsersCount = await this.userModel.find(query);

    return { count: newUsersCount.length, users: newUsers };
  }

  async setProfileImg(
    userDTO: UserIDDTO,
    file: Record<any, any>
  ): Promise<Record<string, any>> {
    const { userID } = userDTO;
    const user = await this.userModel.findOne({ userID });

    if (!user) {
      this.uploaderService.deleteFile(file.path);

      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    if (user.profileImg !== null) {
      const path = join(
        __dirname,
        "..",
        "uploads",
        "profileImages",
        `${userID + "_" + user.profileImg}`
      );

      this.uploaderService.deleteFile(path);
    }

    this.uploaderService.validateImgType(file);

    await this.userModel.findOneAndUpdate(
      { userID: userID },
      { $set: { profileImg: file.filename.split("_")[2] } },
      { new: true }
    );

    return { message: "Image was uploaded successfully!" };
  }

  async cryptPass(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async setAction(userDTO: UserIDDTO) {
    return this.userModel.findOneAndUpdate(
      { userID: userDTO },
      { $set: { actionDate: new Date() } },
      { new: true }
    );
  }

  // async googleRegister(userDTO: GoogleRegisterDTO): Promise<Record<string, any>> {
  //   const { email } = userDTO;
  //
  //   const createdUser = new this.userModel(userDTO);
  //   return await createdUser.save();
  //
  // }
}
