import * as Mongoose from "mongoose";

export const PageSchema = new Mongoose.Schema({
  pageID: {
    type: String,
    required: true,
    unique: true,
  },
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
  },
  pageTitle: String,
  seoTitle: String,
  seoDescription: String,
  seoKeywords: String,
  menuTitle: String,
});
