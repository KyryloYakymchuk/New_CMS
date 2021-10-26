import { Document } from "mongoose";

export interface Job extends Document {
  jobID: string;
  name: string;
  sender: string;
  letter: string;
  date: Date;
  recipientUsers?: Record<string, any>;
  recipientGroups?: Record<string, any>;
}
