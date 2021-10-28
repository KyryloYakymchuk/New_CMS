import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {User} from "../types/user";
import {Fuser} from "../types/fuser";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
  ) {}

  async sendUserConfirmation(user: Fuser, token: string): Promise<void> {
    const url = `http://localhost:5000/fauth/register/confirm/${token}`;

    await this.mailerService.sendMail({
      to: user.contacts.email,
      from: 'Test <test@gmail.com>',
      subject: 'Confirm your Email',
      template: './confirmation',
      context: {
        name: user.userMain.firstName,
        url,
      },
    });
  }

  async sendChangePasswordEmail(user: Fuser, token: string): Promise<void> {
    const url = `http://localhost:3000/auth/reset/${token}`;

    await this.mailerService.sendMail({
      to: user.contacts.email,
      from: 'Test <test@gmail.com>',
      subject: 'Reset your Password',
      template: './changePassword',
      context: {
        name: user.userMain.firstName,
        url,
      },
    });
  }

  async sendMail(options): Promise<void> {
    await this.mailerService.sendMail(options);
  }
}
