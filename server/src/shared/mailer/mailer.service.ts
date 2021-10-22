import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import "dotenv/config";

@Injectable()
export class MailerService {
  private nodemailerTransport: Mail;

  constructor() {
    this.nodemailerTransport = createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
