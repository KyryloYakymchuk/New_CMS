import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

export const JobSchema = new mongoose.Schema({
  jobID: {
    type: String,
    readonly: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  letter: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  recipientUsers: {
    type: Array,
  },
  recipientGroups: {
    type: Array,
  },
});

JobSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified("jobID")) this["jobID"] = uniqid("id-l_");

    return next();
  } catch (e) {
    return next(e);
  }
});
