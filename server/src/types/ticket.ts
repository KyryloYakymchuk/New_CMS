import { Document } from "mongoose";

export interface Ticket extends Document {
  ticketID: string;
  firstname: string;
  lastname: string;
  subject: string;
  email: string;
  phone: string;
  status: string;
  fileName: string;
  text: string;
  comments: Array<any>;
}
