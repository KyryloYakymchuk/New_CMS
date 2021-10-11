import {
  Body,
  Controller,
  Delete,
  Get, Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {DeleteFuserDTO, EditFuserDTO, PaginationDTO, ViewedDTO} from "./dto/fusers.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthGuard } from "@nestjs/passport";
import { QueryDTO } from "../shared/dto/shared.dto";
import { Request } from "express";
import { LoggerGateway } from "../shared/logger/logger.gateway";
import {Fuser} from "../types/fuser";
import {FuserService} from "../shared/fuser/fuser.service";
import {ResponseItemsDTO} from "../modules/dto/modules.dto";

export const module = "fusers";

@Controller("fuser")
export class FusersController {
  constructor(
    private userService: FuserService,
    private loggerGateway: LoggerGateway,
    @InjectModel("Fuser") private userModel: Model<Fuser>
  ) {}

  // @Post()
  // @UseGuards(AuthGuard("jwt"))
  // @HttpCode(HttpStatus.OK)
  // async addUser(
  //   @Body() userDTO: RegisterDTO,
  //   @Req() req: Request
  // ): Promise<Record<string, any>> {
  //   const result = await this.userService.register(userDTO);
  //   // await this.loggerGateway.logAction(req, module);
  //   return result;
  // }

  @Put()
  // @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editUser(
      @Headers('authorization') token: string,
      @Body() userDTO: EditFuserDTO,
      @Req() req: Request
  ): Promise<Record<string, any>> {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);

    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const phoneRegs = /^[0-9\-\+]{9,15}$/;
    const allowedSex = ['male', 'female'];

    if (userDTO.phone && !phoneRegs.test(userDTO.phone)) {
      throw new HttpException(
          'Phone number must be correct',
          HttpStatus.BAD_REQUEST,
      );
    }

    if (userDTO.sex && !allowedSex.includes( userDTO.sex )) {
      throw new HttpException(
          'Sex is invalid',
          HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    // const networkUser = await this.networkUserService.findUserByUserID(verified.userID);


    if (!user /*&& !networkUser*/){
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    userDTO.userID = verified.userID;

    let result = {};

      result = await this.userService.editUser(userDTO);

    return { user: { userID: result['userID'], main: result['userMain'], contacts: result['contacts'], address: result['shippingAddress'] }, message: "User edited successfully!" };

  }

  @Delete(":userID")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async deleteUser(
    @Param("userID") userID: DeleteFuserDTO,
    @Query() userDTO: QueryDTO,
    @Req() req: Request
  ): Promise<Record<string, string>> {
    const user = await this.userService.findUserByID(userID);
    if (!user) throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    await this.loggerGateway.logAction(req, module);
    return await this.userService.deleteUser(userID, userDTO);
  }

  @Get()
  async getUserMainInfo(@Headers('authorization') token: string): Promise<Record<string, any>> {

    const verified = await this.userService.verifyToken(token.split(" ")[1]);


    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID)

    if (!user){
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    return { userID: user.userID, main: user.userMain, contacts: user.contacts, address: user.shippingAddress };

  }

  @Get('wishlist')
  // @UseGuards(AuthGuard("jwt"))
  async getUserWishlist(@Headers('authorization') token: string,
                        @Query() userDTO: PaginationDTO): Promise<Record<string, any>> {

    const verified = await this.userService.verifyToken(token.split(" ")[1]);

    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID)

    if (!user){
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const wishlist = user.wishlist.map((el) => {
      const item = new ResponseItemsDTO(el);
      item.isLiked = true;
      return item;
    });

    const totalCount = wishlist.length;

    if (!userDTO.limit && !userDTO.offset){
      return { totalCount, items: wishlist }
    }

    if (!userDTO.limit){
      return { totalCount,
        items: wishlist.slice( userDTO.offset > 0? userDTO.offset: user.wishlist.length)
      };
    }

    if (!userDTO.offset){
      return { totalCount,
        items: wishlist.slice(0, userDTO.limit)
      };
    }

    return { totalCount,
      items: wishlist.slice( userDTO.offset,
          userDTO.offset > 0? userDTO.offset + userDTO.limit + 1: userDTO.limit)
    };
  }

  @Get('viewed')
  // @UseGuards(AuthGuard("jwt"))
  async getUserViewed(
      @Headers('authorization') token: string,
      @Query() userDTO: PaginationDTO): Promise<Record<string, any>> {

    const verified = await this.userService.verifyToken(token.split(" ")[1]);

    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID)

    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const viewedId = await Promise.all(
        user.viewed.map(
            async (el) => await this.userService.getItemByID('webshop', el.itemID)
        )
    )

    const viewed = viewedId.map((el) => {
      const item = new ViewedDTO(el);
      item.isLiked = el['likedUsers']? el['likedUsers'].includes(verified.userID): false;
      return item;
    });

    const totalCount = viewed.length;

    if (!userDTO.limit && !userDTO.offset) {
      return {totalCount, items: viewed}
    }

    if (!userDTO.limit) {
      return {
        totalCount,
        items: viewed.slice(userDTO.offset > 0 ? userDTO.offset : user.viewed.length)
      };
    }

    if (!userDTO.offset) {
      return {
        totalCount,
        items: viewed.slice(0, userDTO.limit)
      };
    }

    return {
      totalCount,
      items: viewed.slice(userDTO.offset,
          userDTO.offset > 0 ? userDTO.offset + userDTO.limit + 1 : userDTO.limit)
    };

  }
}
