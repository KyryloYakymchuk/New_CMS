import { IsEmail, IsNotEmpty } from "class-validator";

export class IdDTO {
  @IsNotEmpty()
  ticketID: string;
}

export class CreateTicketDTO {
  @IsNotEmpty()
  firstname: string;
  lastname: string;
  subject: string;
  @IsEmail()
  email: string;
  @IsEmail()
  destination: string;
  phone: string;
  fileName: string;
  text: string;
}

export class AnswerDTO {
  ticketID: string;
  subject: string;
  @IsEmail()
  destination: string;
  text: string;
}
