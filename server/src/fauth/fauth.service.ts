
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import {Fuser} from "../types/fuser";
import {FuserService} from "../shared/fuser/fuser.service";
import {MailService} from "../mail/mail.service";
import axios from "axios";
import {SocialNetworkRegisterDTO} from "../auth/dto/auth.dto";

@Injectable()
export class FauthService {
  constructor(
      @InjectModel("Fuser") private userModel: Model<Fuser>,
      private userService: FuserService,
      private mailService: MailService,
  ) {}

  signPayload(payload: any, time: string): string {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: time });
  }

  async validateUser(payload: any): Promise<Record<string, any>> {
    return this.userModel.findOne({ userID: payload.userID });
  }

  async sendEmail(userID: string, hash: any): Promise<Record<string, any>> {
    const user = await this.userService.findUserByID(userID);

    if (user) {
      await this.mailService.sendUserConfirmation(user, hash);

      return { message: "Confirming message has been sent to the email" };
    } else {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
  }

  async sendResetEmail(
      userID: string,
      hash: any
  ): Promise<Record<string, string>> {
    const user = await this.userService.findUserByID(userID);

    if (user) {
      await this.mailService.sendChangePasswordEmail(user, hash);

      return { message: "Confirming message has been sent to the email" };
    } else {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
  }

  async changePassword(
      userID: any,
      newPassword: string
  ): Promise<Record<string, string>> {
    const user = await this.userService.findUserByID(userID);

    const hashed = await bcrypt.hash(newPassword, 10);

    if (user) {
      await this.userModel.findOneAndUpdate(
          { userID: userID },
          {
            $set: {
              password: hashed,
            },
          },
          { new: true }
      );
    } else {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    return { message: "Password changed successfully!" };
  }

  async googleAuth(token: string){
    return axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
        .then(async response => {
          const data = response.data;
          let user = await this.findUser(data['email']);

          if (user && !user.confirmed) {
            await this.userService.setAction(user.userID);
            await this.userService.confirmUser(user.userID);
          } else {
            if (!user) {
              const registerDTO = {
                  contacts: {
                      email: data['email'],
                  },
                  userMain: {
                      firstName: '',
                      lastName: '',
                  },
                  userID: data['user_id'],
                  confirmed: true
              }
              user = await this.SocialNetworkRegister(registerDTO);

            }
          }

          user.userID = data['user_id'];
          await user.save({validateBeforeSave: false});
          return user;
        });
  }

  async facebookAuth(token: string): Promise<Fuser>{
    return axios.get(`https://graph.facebook.com/v8.0/me?access_token=${token}`)
        .then(async response => {
          const {data} = response;

          if (data.error) throw new HttpException('Link expired!', HttpStatus.NOT_FOUND);

            const email = await axios.get(`https://graph.facebook.com/v8.0/me?fields=email&access_token=${token}`)
                .then(async response => {
                    return response.data? response.data['email']: "";
                });

          let user = await this.findUser(email);
          if (!user) {
                const registerDTO = {
                  contacts: {
                      email: email,
                  },
                  userMain: {
                      firstName: data.name.split(" ")[0],
                      lastName: data.name.split(" ")[1],
                  },
                  userID: data['user_id'] || data['id'],
                    confirmed: true,
              }
            user = await this.SocialNetworkRegister(registerDTO);
          }

          return user;
        });
  }

    async SocialNetworkRegister(userDTO: SocialNetworkRegisterDTO): Promise<Record<string, any>> {

        const createdUser = new this.userModel(userDTO);
        return await createdUser.save({ validateBeforeSave: false });

    }

    async findUser(email: string): Promise<any> {
        return this.userModel.findOne({ 'contacts.email': email } );
    }
}
