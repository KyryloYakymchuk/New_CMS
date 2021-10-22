import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from "mongoose";

import { Order } from "../types/order";
import {
  AddOrderDTO,
  AddProblemDTO,
  AllOrdersDTO,
  CancelOrderDTO,
  EditOrderDTO,
  PaginationDTO,
} from "./dto/order.dto";
import { FuserService } from "../shared/fuser/fuser.service";
import { OrderProblem } from "../types/orderProblem";
import { ModulesService } from "src/modules/modules.service";
import { UserService } from "../shared/user/user.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel("Order") private orderModel: Model<Order>,
    @InjectModel("OrderProblems")
    private orderProblemModel: Model<OrderProblem>,
    private userService: FuserService,
    private allUserService: UserService,
    private modulesService: ModulesService
  ) {}

  async getAllCount(): Promise<Number> {
    return this.orderModel.find().count();
  }

  async getAllOrders(): Promise<Record<string, any>> {
    return this.orderModel.find();
  }

  async getAll(paginationDTO: AllOrdersDTO): Promise<Record<string, any>> {
    const allowedParameters = ["orderId", "totalPrice"];

    let sortParameter = allowedParameters.includes(paginationDTO.sortField)
      ? paginationDTO.sortField
      : "orderId";
    if (sortParameter == "name") {
      sortParameter = "client.clientFirstName";
    } else {
      if (sortParameter == "surname") {
        sortParameter = "client.clientLastName";
      }
    }
    sortParameter =
      paginationDTO.sortParameter == "descending"
        ? "-" + sortParameter
        : sortParameter;

    let filter = {};

    if (paginationDTO.search) {
      filter = {
        $or: [],
      };
      filter["$or"].push({
        ["client.clientFirstName"]: {
          $regex: paginationDTO.search,
          $options: "i",
        },
      });
      filter["$or"].push({
        ["client.clientLastName"]: {
          $regex: paginationDTO.search,
          $options: "i",
        },
      });
      filter["$or"].push({
        ["totalPrice"]: +paginationDTO.search ? +paginationDTO.search : 0,
      });
    }

    filter["createDate"] = {
      $gte: paginationDTO.from ? new Date(paginationDTO.from) : new Date(0),
      $lte: paginationDTO.to ? new Date(paginationDTO.to) : Date.now(),
    };

    if (paginationDTO.searchId) {
      filter = {
        orderId: +paginationDTO.searchId,
      };
    }

    return this.orderModel
      .find(filter)
      .skip(+paginationDTO.offset)
      .limit(+paginationDTO.limit)
      .sort(sortParameter);
  }

  async getOrders(
    token: string,
    paginationDTO?: PaginationDTO
  ): Promise<Record<string, any>> {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }
    return this.orderModel
      .find({ "client.clientId": verified.userID })
      .skip(paginationDTO ? +paginationDTO.offset : 0)
      .limit(paginationDTO ? +paginationDTO.limit : user.orders.length);
  }

  async addOrder(token: string, userDTO: AddOrderDTO) {
    let verified, mainUser, user;
    const { userID } = userDTO;
    verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    mainUser = await this.userService.findUserByUserID(verified.userID);

    try {
      user = await this.allUserService.findUserByID(userID ? userID : "");
    } catch (err) {}
    if (!user && !mainUser) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const Item = require(`../../schemas/${userDTO.moduleName}`);

    const newProducts = await Promise.all(
      userDTO.products.map(async (el) => {
        const product = await Item.findOne({ itemID: el.itemID });
        const variant = product.variants.find((variant) => {
          return variant.variantID == el.variantID;
        });
        el = {
          itemID: el.itemID,
          variantID: variant.variantID,
          name: product.name + " " + variant.name,
          price: variant.price,
          image: variant.images[0],
          productQuantity: el.quantity,
        };
        return el;
      })
    );
    const lastOrder = await this.orderModel.find().limit(1).sort("-orderId");

    const order = {
      client: {
        clientId: user ? userDTO.userID : mainUser.userID,
        clientFirstName: userDTO.firstName,
        clientLastName: userDTO.lastName,
        clientEmail: userDTO.email,
        clientNumber: userDTO.number,
        clientAddress: userDTO.address,
      },
      products: newProducts,
      shippingInfo: {
        clientFirstName: userDTO.shippingFirstName,
        clientLastName: userDTO.shippingLastName,
        clientEmail: userDTO.shippingEmail,
        clientAddress: userDTO.shippingAddress,
        clientPhone: userDTO.shippingPhone,
        clientVatNo: userDTO.shippingVatNo,
      },
      discount: userDTO.discount,
      shipping: userDTO.shipping,
      totalPrice: +userDTO.totalPrice,
      payment: userDTO.payment,
      status: "In process",
      orderId: lastOrder[0] ? lastOrder[0]["orderId"] + 1 : 1,
    };

    if (!user) {
      mainUser.orders.push(order);
      const orders = mainUser.orders;
      await this.userService.editUser({ userID: mainUser.userID, orders });
    }

    await this.orderModel.create(order);

    return { message: "Order created successfully" };
  }

  async editOrder(token: string, userDTO: EditOrderDTO) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    if (userDTO.products) {
      userDTO.products = userDTO.products.map((el) => {
        return this.modulesService.getItemByID(userDTO.moduleName, el.itemID);
      });
    }

    const order = user.orders.find((el) => {
      return el.orderId == userDTO.orderId;
    });
    if (!order) {
      throw new HttpException("No order by this id", HttpStatus.NOT_FOUND);
    }

    order.shipping.address = userDTO.address || order.shipping.address;
    order.products = userDTO.products || order.products;
    order.discount = userDTO.discount || order.discount;
    order.payment = userDTO.payment || order.payment;
    order.status = userDTO.status || order.status;

    let orders = user.orders.filter(function (value /*, index, arr*/) {
      return value.orderId != userDTO.orderId;
    });

    orders.push(order);
    await this.userService.editUser({ userID: user.userID, orders });

    await this.orderModel.findOneAndUpdate({ orderId: order.orderId }, order);

    return { message: "Order edited successfully" };
  }

  async deleteOrder(userDTO: number) {
    const users = await this.userService.getAllUsers();

    let order, userId;
    users.forEach((user) => {
      order = user.orders.find((el) => {
        return el.orderId == userDTO;
      });
      if (order) {
        userId = user.userID;
        return order;
      }
    });

    if (!order) {
      throw new HttpException("No order by this id", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(userId);
    let orders = user.orders.filter(function (value /*, index, arr*/) {
      return value.orderId != order.orderId;
    });
    await this.userService.editUser({ userID: userId, orders });

    order = await this.orderModel.findOne({ orderId: userDTO });

    if (!order) {
      throw new HttpException("No order by this id", HttpStatus.NOT_FOUND);
    }

    await this.orderModel.findOneAndDelete({ orderId: userDTO });

    return { message: "Order deleted successfully" };
  }

  async cancelOrder(token: string, userDTO: CancelOrderDTO) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const order = user.orders.find((el) => {
      return el.orderId == userDTO.orderID;
    });
    if (!order) {
      throw new HttpException("No order by this id", HttpStatus.NOT_FOUND);
    }
    if (order.status == "Canceled") {
      throw new HttpException("Order already canceled", HttpStatus.NOT_FOUND);
    }
    order.status = "Canceled";

    let orders = user.orders.filter(function (value) {
      return value.orderId != userDTO.orderID;
    });

    orders.push(order);
    await this.userService.editUser({ userID: user.userID, orders });
    await this.orderModel.findOneAndUpdate({ orderId: order.orderId }, order);

    return { message: "Order canceled successfully" };
  }

  async addProblem(token: string, userDTO: AddProblemDTO) {
    const verified = await this.userService.verifyToken(token.split(" ")[1]);
    if (!verified) {
      throw new HttpException("Link expired!", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findUserByUserID(verified.userID);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    const order = await this.orderModel.findOne({ orderId: userDTO.orderID });
    if (order.client.clientId != verified.userID) {
      throw new HttpException(
        "You haven`t order with this Id",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.orderProblemModel.create(userDTO);
  }
}
