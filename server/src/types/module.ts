import { Document } from "mongoose";

export interface Module extends Document {
  moduleID: string;
  name: string;
  fields: Record<any, any>;
  icon: string;
  categories: boolean;
}
