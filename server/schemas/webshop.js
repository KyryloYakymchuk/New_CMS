import mongoose from "mongoose";

const WebshopSchema = new mongoose.Schema({
  itemID: String,
  publishDate: String,
  archiveDate: String,
  status: String,
  name: String,
  Description: String,
  DropdownHere: String,
  order: Number,
  variants: Array,
  image: Array,
});

module.exports = mongoose.model("webshop", WebshopSchema);
