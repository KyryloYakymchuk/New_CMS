import { Document } from "mongoose";

export class Product extends Document {
  productID: string;
  name: string;
  description?: string;
  categories?: Record<any, any>;
  variants?: Record<any, any>;
  productImages?: string;
  likedUsers?: Array<any>;
}
