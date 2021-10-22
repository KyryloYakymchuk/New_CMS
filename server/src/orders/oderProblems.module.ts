import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderProblemsSchema } from "../models/orderProblems.schema";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "OrderProblems", schema: OrderProblemsSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class OrderProblemsModule {}
