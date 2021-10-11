import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

export const JobSchema = new mongoose.Schema({
  jobID: {
    type: String,
    readonly: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
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
    if (this.isModified("jobID")) {
      return next();
    }
    this["jobID"] = uniqid("id-l_");
    return next();
  } catch (e) {
    return next(e);
  }
});
