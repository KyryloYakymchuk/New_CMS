import * as Mongoose from "mongoose";

export const PageSchema = new Mongoose.Schema({
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});
