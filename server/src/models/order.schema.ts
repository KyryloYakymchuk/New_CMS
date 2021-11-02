import * as mongoose from "mongoose";
import { raw } from "@nestjs/mongoose";

export const OrderSchema = new mongoose.Schema({
  createDate: {
    readonly: true,
    type: Date,
    default: Date.now,
  },
  products: {
    type: Array,
  },
  shippingInfo: {
    type: raw({
      address1: String,
      address2: String,
      firstName: String,
      lastName: String,
      phone: String,
      arrivalCountry: String,
      arrivalSity: String,
      zipCode: String,
      mail: String,
    }),
  },
  discount: {
    type: raw({
      name: String,
      count: Number,
    }),
  },
  client: {
    type: raw({
      clientId: String,
      clientFirstName: String,
      clientLastName: String,
      clientEmail: String,
      clientAddress: String,
      clientPhone: String,
      clientNumber: String,
      clientVatNo: String,
    }),
  },
  totalPrice: {
    type: Number,
  },
  status: String,
  payment: String,
  shipping: String,
  orderId: Number,
});
