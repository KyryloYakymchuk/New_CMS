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
  { collection: "Webshop" }
);

module.exports =
  mongoose.models["Webshop"] || mongoose.model("Webshop", WebshopSchema);
