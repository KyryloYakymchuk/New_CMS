import { Document } from "mongoose";

export interface User extends Document {
  groupID: string;
  email: string;
  password: string;
  group: string;
  phone: string;
  name: string;
  lastname: string;
  profileImg: string;
  birthday: Date;
  registerDate: Date;
  confirmed: boolean;
  actionDate: Date;
}
