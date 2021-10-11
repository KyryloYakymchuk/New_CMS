import { Document } from "mongoose";

export interface Log extends Document {
  logID: string;
  userID: string;
  userEmail: string;
  username: string;
  moduleID: string;
  action: string;
  date: Date;
}
