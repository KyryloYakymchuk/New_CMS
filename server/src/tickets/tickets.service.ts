import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as uniqid from "uniqid";

import { MailService } from "../mail/mail.service";
import { Ticket } from "../types/ticket";
import { QueryDTO } from "../shared/dto/shared.dto";
import { AnswerDTO, CreateTicketDTO, IdDTO } from "./dto/tickets.dto";

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel("Ticket") private ticketModel: Model<Ticket>,
    private mailerService: MailService
  ) {}

  async getAll(userDTO: QueryDTO): Promise<Record<string, any>> {
    return this.ticketModel
      .find()
      .skip(+userDTO.offset)
      .limit(+userDTO.limit);
  }

  async getById(userDTO: IdDTO): Promise<Ticket> {
    const ticket = await this.ticketModel.findOneAndUpdate(
      { ticketID: userDTO.ticketID },
      { $set: { read: true } },
      { new: true }
    );
    if (!ticket)
      throw new HttpException("Ticket not found", HttpStatus.BAD_REQUEST);

    return ticket;
  }

  async createTicket(
    userDTO: CreateTicketDTO,
    queryDTO: QueryDTO
  ): Promise<Record<string, any>> {
    const newTicket = userDTO;
    newTicket["ticketID"] = uniqid();
    await this.ticketModel.create(newTicket);
    await this.mailerService.sendMail({
      from: userDTO.email,
      to: userDTO.destination,
      subject: userDTO.subject,
      template: "../server/src/mail/templates/clientTicket.hbs",
      context: {
        text: userDTO.text,
        ticketID: newTicket["ticketID"],
      },
    });

    return this.ticketModel
      .find()
      .skip(+queryDTO.offset)
      .limit(+queryDTO.limit);
  }

  async editStatus(userDTO: IdDTO): Promise<Record<string, any>> {
    await this.ticketModel.findOneAndUpdate(
      { ticketID: userDTO.ticketID },
      { $set: { status: "closed" } }
    );

    return this.ticketModel.find();
  }

  async deleteTicket(userDTO: IdDTO): Promise<string> {
    await this.ticketModel.findOneAndDelete({ ticketID: userDTO.ticketID });

    return "Ticket deleted successfully";
  }

  async sendAnswer(userDTO: AnswerDTO): Promise<Record<string, any>> {
    const ticket = await this.ticketModel.findOne({
      ticketID: userDTO.ticketID,
    });

    if (!ticket) {
      throw new HttpException("Ticket not found", HttpStatus.BAD_REQUEST);
    }

    const ticketComments = ticket.comments;
    ticketComments.push({
      text: userDTO.text,
      subject: userDTO.subject,
    });

    await this.ticketModel.findOneAndUpdate(
      { ticketID: userDTO.ticketID },
      { $set: { comments: ticketComments } }
    );

    await this.mailerService.sendMail({
      to: userDTO.destination,
      subject: userDTO.subject,
      template: "../server/src/mail/templates/answerTicket.hbs",
      context: {
        text: userDTO.text,
      },
    });

    return this.ticketModel.findOne({ ticketID: userDTO.ticketID });
  }
}
