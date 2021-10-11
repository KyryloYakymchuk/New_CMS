import { Document } from "mongoose";

export interface Newsletter extends Document {
  newsletterID: string;
  date: Date;
  recipientGroups: Record<string, any>;
  recipientUsers: Record<string, any>;
  letter: string;
  status: string;
}
