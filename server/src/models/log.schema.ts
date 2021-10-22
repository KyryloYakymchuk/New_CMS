import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

export const LogSchema = new mongoose.Schema({
  logID: {
    type: String,
    readonly: true,
    unique: true,
  },
  userID: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  username: {
    type: String,
  },
  module: {
    type: String,
  },
  action: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

LogSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified("logID"))
      this["logID"] = uniqid("id-l_");

    return next();
  } catch (e) {
    return next(e);
  }
});
