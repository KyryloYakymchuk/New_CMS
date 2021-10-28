import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderProblemsSchema } from "../models/orderProblems.schema";

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
