import { Module } from "@nestjs/common";
import { ModulesController } from "./modules.controller";
import { ModulesService } from "./modules.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ModuleSchema } from "../models/module.schema";
import { LoggerModule } from "../logger/logger.module";
import { SharedModule } from "../shared/shared.module";
import { CategorySchema } from "../models/category.schema";
import { FuserService } from "../shared/fuser/fuser.service";
import { FuserSchema } from "../models/fuser.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Module", schema: ModuleSchema },
      { name: "Category", schema: CategorySchema },
    ]),
    LoggerModule,
    SharedModule,
    MongooseModule.forFeature([{ name: "Fuser", schema: FuserSchema }]),
    // MongooseModule.forFeature([{ name: 'Variant', schema: VariantSchema }]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService, FuserService],
  exports: [ModulesService]
})
export class ModulesModule {}
