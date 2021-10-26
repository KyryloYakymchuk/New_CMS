import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

export const ModuleSchema = new mongoose.Schema({
  moduleID: {
    type: String,
    readonly: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
  },
  icon: {
    type: String,
  },
  categories: {
    type: Boolean,
  },
});

ModuleSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified("moduleID")) this["moduleID"] = uniqid("id-m_");

    return next();
  } catch (e) {
    return next(e);
  }
});
