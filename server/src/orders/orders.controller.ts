import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { OrdersService } from "./orders.service";
import {
  AddOrderDTO,
  AddProblemDTO,
  AllOrdersDTO,
  CancelOrderDTO,
  EditOrderDTO,
  PaginationDTO,
  ResponseAllOrdersDTO,
  ResponseOrdersDTO,
} from "./dto/order.dto";
import { OrderItemsDTO } from "../modules/dto/modules.dto";

export const module = "orders";

@ApiTags("order")
@ApiBearerAuth()
@Controller("order")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get("all")
  @UseGuards(AuthGuard("jwt"))
  async getAll(
    @Query() paginationDTO: AllOrdersDTO
  ): Promise<Record<string, any>> {
    const orders = await this.ordersService.getAll(paginationDTO);
    if (orders.length == 0) {
      throw new HttpException("Orders not found", HttpStatus.NOT_FOUND);
    }

    const count = await this.ordersService.getAllCount();
    orders.reverse();

    orders.forEach((order) => {
      let i = 0;
      order.products.forEach((el) => {
        order.products[i] = new OrderItemsDTO(el);
        i++;
      });
    });

    return {
      count,
      orders: orders.map((order) => new ResponseAllOrdersDTO(order)),
    };
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getOrders(
    @Headers("authorization") token: string,
    @Query() paginationDTO: PaginationDTO
  ): Promise<Record<string, any>> {
    const orders = await this.ordersService.getOrders(token, paginationDTO);
    const totalCount = await this.ordersService.getOrders(token);

    return {
      totalCount: totalCount.length,
      items: orders.map((order) => new ResponseOrdersDTO(order)),
    };
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async addOrder(
    @Body() userDTO: AddOrderDTO,
    @Req() req: Request,
    @Headers("authorization") token: string
  ): Promise<Record<string, any>> {
    return this.ordersService.addOrder(token, userDTO);
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async editOrder(
    @Body() userDTO: EditOrderDTO,
    @Headers("authorization") token: string,
    @Req() req: Request
  ): Promise<any> {
    return this.ordersService.editOrder(token, userDTO);
  }

  @Delete("/:orderId")
  @UseGuards(AuthGuard("jwt"))
  async deleteOrder(
    @Param("orderId") userDTO: number,
    @Query() paginationDTO: AllOrdersDTO,
    // @Headers('authorization') token: string,
    @Req() req: Request
  ): Promise<any> {
    await this.ordersService.deleteOrder(userDTO);
    const orders = await this.ordersService.getAll(paginationDTO);
    return { count: orders.length, orders };
  }

  @Put("/cancel")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async cancelOrder(
    @Body() userDTO: CancelOrderDTO,
    @Headers("authorization") token: string,
    @Req() req: Request
  ): Promise<any> {
    return this.ordersService.cancelOrder(token, userDTO);
  }

  @Get("completed")
  @UseGuards(AuthGuard("jwt"))
  async getCompleted(
    // @Query() paginationDTO: AllOrdersDTO,
    @Headers("authorization") token: string
  ): Promise<Record<string, any>> {
    const orders = await this.ordersService.getOrders(token);

    if (orders.length == 0) {
      throw new HttpException("Orders not found", HttpStatus.NOT_FOUND);
    }

    let completed = [];

    orders.forEach((order) => {
      if (order.status == "Completed")
        order.products.forEach((el) => {
          completed.push({
            variantID: el.variantID,
            itemID: el.itemID,
            name: el.name,
            image: el.image,
          });
        });
    });
    completed = completed.filter(
      (v, i, a) => a.findIndex((t) => t.variantID === v.variantID) === i
    );
    return { totalCount: completed.length, items: completed };
  }

  @Post("problem")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.CREATED)
  async addProblem(
    @Body() userDTO: AddProblemDTO,
    @Req() req: Request,
    @Headers("authorization") token: string
  ): Promise<Record<string, any>> {
    await this.ordersService.addProblem(token, userDTO);
    return { message: "Complaint sent successfully" };
  }
}
