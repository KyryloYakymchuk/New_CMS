import { Module } from "@nestjs/common";
import { PagesController } from "./pages.controller";
import { PagesService } from "./pages.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PageSchema } from "../models/page.schema";
import { GuardsModule } from "../guards/guards.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Page", schema: PageSchema }]),
    GuardsModule,
  ],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
