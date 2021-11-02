import * as Mongoose from "mongoose";

export const TicketSchema = new Mongoose.Schema({
  ticketID: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    default: "open",
    enum: ["open", "closed"],
  },
  read: {
    type: Boolean,
    default: false,
  },
  text: String,
  fileName: {
    type: String,
    default: "",
  },
  comments: {
    type: Array,
  },
});
