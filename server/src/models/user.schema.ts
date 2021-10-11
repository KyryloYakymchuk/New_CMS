import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as uniqid from 'uniqid';

export const UserSchema = new mongoose.Schema({
  userID: {
    readonly: true,
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  group: {
    type: Array,
    default: ['User'],
  },
  phone: {
    type: String,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  profileImg: {
    type: String,
    default: null,
  },
  birthday: {
    type: String,
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
});

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  try {
    if (this.isModified('userID')) {
      return next();
    }

    this['userID'] = uniqid('id-u_');
    this['password'] = await bcrypt.hash(this['password'], 10);

    return next();
  } catch (e) {
    return next(e);
  }
});
