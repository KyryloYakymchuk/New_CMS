import * as mongoose from "mongoose";
import * as uniqid from "uniqid";

export const GroupSchema = new mongoose.Schema({
  groupID: {
    type: String,
    readonly: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: Object,
    default: {
      pages: {
        type: Object,
        add: false,
        edit: false,
        delete: false,
        watch: false,
      },
      users: {
        type: Object,
        add: false,
        edit: false,
        delete: false,
        watch: false,
      },
      groups: {
        type: Object,
        add: false,
        edit: false,
        delete: false,
        watch: false,
      },
    },
  },
});

GroupSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified("groupID"))
      this["groupID"] = uniqid("id-g_");

    return next();
  } catch (e) {
    return next(e);
  }
});
