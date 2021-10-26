import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { SocketIoAdapter } from "./socket-io.adapter";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });

  const config = new DocumentBuilder()
    .setTitle("CMS api")
    .setDescription("The CMS API description")
    .setVersion("1.0")
    // .addBearerAuth(
    //   { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    //   "access-token"
    // )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useWebSocketAdapter(new SocketIoAdapter(app, true));

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  await app.listen(process.env.PORT || 5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
