import * as mongoose from "mongoose";

export const OrderProblemsSchema = new mongoose.Schema({
  orderID: Number,
  problem: String,
});
