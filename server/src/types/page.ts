import { Document } from "mongoose";

export interface Page extends Document {
  alias: string;
  name: string;
  content: string;
}
