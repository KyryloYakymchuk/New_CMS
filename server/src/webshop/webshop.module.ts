import { Module } from "@nestjs/common";
import { WebshopController } from "./webshop.controller";
import { WebshopService } from "./webshop.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "../models/category.schema";
import { SharedModule } from "../shared/shared.module";
import {FuserSchema} from "../models/fuser.schema";
import {FuserService} from "../shared/fuser/fuser.service";
import {FusersModule} from "../fusers/fusers.module";
import {OrdersModule} from "../orders/orders.module";
import {OrdersService} from "../orders/orders.service";
import {OrderSchema} from "../models/order.schema";
import {ModulesModule} from "../modules/modules.module";
import {ModulesService} from "../modules/modules.service";
import {ModuleSchema} from "../models/module.schema";
import {OrderProblemsSchema} from "../models/orderProblems.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: "Fuser", schema: FuserSchema }]),
    MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]),
    MongooseModule.forFeature([{name: "Module", schema: ModuleSchema}]),
    MongooseModule.forFeature([{ name: "OrderProblems", schema: OrderProblemsSchema }]),
    SharedModule,
    FusersModule,
    ModulesModule
  ],
  controllers: [WebshopController],
  providers: [WebshopService, FuserService, OrdersService, ModulesService],
})
export class WebshopModule {}
