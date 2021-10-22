import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { PagesModule } from "./pages/pages.module";
import { GroupsModule } from "./groups/groups.module";
import { UsersModule } from "./users/users.module";
import { MulterModule } from "@nestjs/platform-express";
import { ModulesModule } from "./modules/modules.module";
import { WebshopModule } from "./webshop/webshop.module";
import { LoggerModule } from "./logger/logger.module";
import { ScheduleModule } from "@nestjs/schedule";
import { loginCheckMiddleware } from "./middleware/loginCheck.middleware";
import { FusersModule } from "./fusers/fusers.module";
import { FauthModule } from "./fauth/fauth.module";
import { ConfigModule } from "@nestjs/config";
import { OrdersModule } from "./orders/orders.module";
import { OrderProblemsModule } from "./orders/oderProblems.module";
import "dotenv/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MulterModule.register({
      dest: "./uploads",
    }),
    ScheduleModule.forRoot(),
    SharedModule,
    AuthModule,
    FauthModule,
    FusersModule,
    PagesModule,
    GroupsModule,
    UsersModule,
    OrdersModule,
    ModulesModule,
    OrderProblemsModule,
    WebshopModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(loginCheckMiddleware)
      .forRoutes(
        UsersModule,
        GroupsModule,
        PagesModule,
        OrdersModule,
        OrderProblemsModule,
        WebshopModule,
        FusersModule,
        LoggerModule
      );
  }
}
