import { Document } from "mongoose";

export interface Job extends Document {
  jobID: string;
  title: string;
  sender: string;
  recipientUsers: Record<string, any>;
  recipientGroups: Record<string, any>;
}
