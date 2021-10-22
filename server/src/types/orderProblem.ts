import { Document } from "mongoose";

export interface OrderProblem extends Document {
  orderID: number;
  problem: string;
}
