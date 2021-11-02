import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { GuardsModule } from "../guards/guards.module";
import { LoggerModule } from "../logger/logger.module";
import { OrderSchema } from "../models/order.schema";
import { FuserService } from "../shared/fuser/fuser.service";
import { ModulesService } from "../modules/modules.service";
import { ModulesModule } from "../modules/modules.module";
import { FuserSchema } from "../models/fuser.schema";
import { UploaderService } from "../shared/uploader/uploader.service";
import { ModuleSchema } from "../models/module.schema";
import { CategorySchema } from "../models/category.schema";
import { OrderProblemsSchema } from "../models/orderProblems.schema";
import { OrderProblemsService } from "./OrderProblemsService";
import { OrderProblemsModule } from "./oderProblems.module";
import { UserService } from "../shared/user/user.service";
import { UserSchema } from "../models/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: "OrderProblems", schema: OrderProblemsSchema },
    ]),
    MongooseModule.forFeature([{ name: "Fuser", schema: FuserSchema }]),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Module", schema: ModuleSchema }]),
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }]),
    GuardsModule,
    OrderProblemsModule,
    LoggerModule,
    ModulesModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    FuserService,
    ModulesService,
    UploaderService,
    OrderProblemsService,
    UserService,
  ],
})
export class OrdersModule {}
