import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

export const CategorySchema = new mongoose.Schema({
  categoryID: {
    type: String,
    unique: true,
    readonly: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  subcategories: {
    type: Array,
  },
  categoryImage: {
    type: String,
    default: null,
  },
});

CategorySchema.pre("save", async function (next: mongoose.HookNextFunction) {
  try {
    if (this.isModified("categoryID")) {
      return next();
    }
    this["categoryID"] = uniqid("id-c_");
    return next();
  } catch (e) {
    return next(e);
  }
});
