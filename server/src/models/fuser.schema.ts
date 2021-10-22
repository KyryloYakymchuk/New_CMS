import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as uniqid from "uniqid";
import { raw } from "@nestjs/mongoose";

export const FuserSchema = new mongoose.Schema({
  userID: {
    readonly: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  group: {
    type: Array,
    default: ["User"],
  },
  registerDate: {
    readonly: true,
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  actionDate: {
    type: Date,
    default: Date.now,
  },
  viewed: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  wishlist: {
    type: Array,
  },
  orders: {
    type: Array,
  },
  shippingAddress: {
    type: raw({
      address1: String,
      address2: String,
    }),
  },
  contacts: {
    type: raw({
      email: String,
      phone: String,
    }),
  },
  userMain: {
    type: raw({
      firstName: String,
      lastName: String,
      birthday: Date,
      sex: String,
    }),
  },
});

FuserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified("userID")) {
      this["userID"] = uniqid("id-u_");
      this["password"] = await bcrypt.hash(this["password"], 10);
    }

    return next();
  } catch (e) {
    return next(e);
  }
});
