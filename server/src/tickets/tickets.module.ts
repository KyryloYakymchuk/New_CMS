import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TicketSchema } from "../models/ticket.schema";
import { SharedModule } from "../shared/shared.module";
import { MailService } from "../mail/mail.service";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Ticket", schema: TicketSchema }]),
    SharedModule,
  ],
  providers: [TicketsService, MailService],
  controllers: [TicketsController],
})
export class TicketsModule {}
