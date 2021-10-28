import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { ScheduleModule } from "@nestjs/schedule";
import { loginCheckMiddleware } from "./middleware/loginCheck.middleware";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { PagesModule } from "./pages/pages.module";
import { GroupsModule } from "./groups/groups.module";
import { UsersModule } from "./users/users.module";
import { ModulesModule } from "./modules/modules.module";
import { WebshopModule } from "./webshop/webshop.module";
import { LoggerModule } from "./logger/logger.module";
import { FusersModule } from "./fusers/fusers.module";
import { FauthModule } from "./fauth/fauth.module";
import { OrdersModule } from "./orders/orders.module";
import { OrderProblemsModule } from "./orders/oderProblems.module";
import { NewslettersModule } from "./newsletters/newsletters.module";
import { TicketsModule } from "./tickets/tickets.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true }),
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
    NewslettersModule,
    TicketsModule,
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
        LoggerModule,
        NewslettersModule
      );
  }
}
