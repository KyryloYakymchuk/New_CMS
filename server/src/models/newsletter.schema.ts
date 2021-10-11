import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

export const NewsletterSchema = new mongoose.Schema({
  newsletterID: {
    type: String,
    unique: true,
    readonly: true,
  },
  date: {
    type: Date,
  },
  recipientGroups: {
    type: Array,
  },
  recipientUsers: {
    type: Array,
  },
  letter: {
    type: String,
  },
  status: {
    type: String,
  },
});

NewsletterSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  try {
    if (this.isModified("newsletterID")) {
      return next();
    }
    this["newsletterID"] = uniqid("id-n_");
    return next();
  } catch (e) {
    return next(e);
  }
});
