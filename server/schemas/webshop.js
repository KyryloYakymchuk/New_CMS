const mongoose = require("mongoose");

const WebshopSchema = new mongoose.Schema(
  {
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
  },
  { collection: "webshop" }
);

module.exports =
  mongoose.models["webshop"] || mongoose.model("webshop", WebshopSchema);
