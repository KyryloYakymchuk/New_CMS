import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import * as cron from "node-cron";
import { verify } from "jsonwebtoken";

import { LoginDTO, UserIDDTO } from "../../auth/dto/auth.dto";
import { DeleteUserDTO } from "../../users/dto/users.dto";
import { QueryDTO } from "../dto/shared.dto";
// import {UploaderService} from "../uploader/uploader.service";
import { Fuser } from "../../types/fuser";
import { EditFuserDTO } from "../../fusers/dto/fusers.dto";

@Injectable()
export class FuserService {
  constructor(
    @InjectModel("Fuser") private userModel: Model<Fuser>
  ) // private uploaderService: UploaderService
  {}

  private static sanitizeUser(user: Fuser): Record<any, any> {
    return user.depopulate("password");
  }

  async getAllUsers(): Promise<Record<any, any>> {
    return this.userModel.find();
  }

  async findUser(email): Promise<any> {
    return this.userModel.findOne({ "contacts.email": email });
  }

  async findUserByID(userID: any): Promise<any> {
    const user = await this.userModel.findOne({ userID });
    if (!user)
      throw new HttpException("User not found!", HttpStatus.BAD_REQUEST);

    return user;
  }

  async findUserByUserID(userID: any): Promise<any> {
    return this.userModel.findOne({ userID });
  }

  async register(userDTO): Promise<Record<string, any>> {
    const { email } = userDTO.contacts;

    const user = await this.findUser(email);
    if (user)
      throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST);

    const containsNumbers = /^.*\d+.*$/;
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    const phoneRegs = /^[0-9\-\+]{9,15}$/;
    const allowedSex = ["male", "female"];

    if (
      !containsNumbers.test(userDTO.password) ||
      !containsLetters.test(userDTO.password)
    )
      throw new HttpException(
        "Password must contain numbers and letters",
        HttpStatus.BAD_REQUEST
      );

    if (!phoneRegs.test(userDTO.contacts.phone)) {
      throw new HttpException(
        "Phone number must be correct",
        HttpStatus.BAD_REQUEST
      );
    }

    if (!allowedSex.includes(userDTO.userMain.sex)) {
      throw new HttpException("Sex is invalid", HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();

    const deleteTask = await cron.schedule("* * 2 * *", () => {
      if (user.confirmed === false) {
        this.userModel.deleteOne({ contacts: { email } });
      }

      deleteTask.destroy();
    });

    return FuserService.sanitizeUser(createdUser);
  }

  async login(userDTO: LoginDTO): Promise<Record<any, any>> {
    const { email, password } = userDTO;

    const user = await this.findUser(email);
    if (!user)
      throw new HttpException("Email is incorrect", HttpStatus.BAD_REQUEST);

    if (!user.confirmed)
      throw new HttpException(
        "Your account not confirmed",
        HttpStatus.BAD_REQUEST
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException("Wrong password!", HttpStatus.UNAUTHORIZED);

    return FuserService.sanitizeUser(user);
  }

  async verifyToken(token: string): Promise<any> {
    return verify(token, "secretKey");
  }

  async confirmUser(userID: string): Promise<string> {
    await this.userModel.findOneAndUpdate(
      { userID },
      { $set: { confirmed: true } },
      { new: true }
    );

    return "User confirmed successfully!<script>setTimeout(() => window.close(), 2000);</script>";
  }

  async editUser(userDTO: EditFuserDTO): Promise<Record<string, any>> {
    const { userID } = userDTO;
    const user = await this.findUserByID(userID);
    const newDto = {
      userMain: {
        firstName: userDTO.firstName || user.userMain.firstName,
        lastName: userDTO.lastName || user.userMain.lastName,
        sex: userDTO.sex || user.userMain.sex,
        birthday: userDTO.birthday || user.userMain.birthday,
      },
      contacts: {
        email: userDTO.email || user.contacts.email,
        phone: userDTO.phone || user.contacts.phone,
      },
      shippingAddress: {
        address1: userDTO.address1 || user.shippingAddress.address1,
        address2: userDTO.address2 || user.shippingAddress.address2,
      },
      wishlist: userDTO.wishlist || user.wishlist,
      viewed: userDTO.viewed || user.viewed,
      orders: userDTO.orders || user.orders,
    };
    await this.userModel.findOneAndUpdate(
      { userID },
      { $set: newDto },
      { new: true }
    );
    return this.findUserByID(userID);
  }

  async deleteUser(
    userID: DeleteUserDTO,
    userDTO: QueryDTO
  ): Promise<Record<string, any>> {
    const { search, limit, offset } = userDTO;
    const user = await this.findUserByID(userID);

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

  async cryptPass(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async setAction(userDTO: UserIDDTO) {
    return this.userModel.findOneAndUpdate(
      { userID: userDTO.userID },
      { $set: { actionDate: new Date() } },
      { new: true }
    );
  }

  async getItemByID(
    moduleName: string,
    itemID: string
  ): Promise<Record<any, any>> {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../../schemas/${moduleName}`);

    return Item.findOne({ itemID });
  }
}
