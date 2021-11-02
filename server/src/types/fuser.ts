import { Document } from "mongoose";

export interface Fuser extends Document {
  groupID: string;
  password: string;
  group: string;
  registerDate: Date;
  confirmed: boolean;
  actionDate: Date;
  userMain: {
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: string;
  };
  contacts: {
    email: string;
    phone?: string;
  };
  shippingAddress: {
    address1: string;
    address2: string;
  };
  orders: Array<any>;

  wishlist: Array<any>;

  viewed: Array<any>;

  comments: Array<any>;

  mailings: {
    types: {
      news: boolean;
      discounts: boolean;
      recommendations: false;
      offers: true;
    };
    connections: {
      email: true;
      viber: true;
      sms: false;
      "mobile-notifications": false;
      "web-notifications": true;
    };
  };
  likedNews: Array<string>;
  userID: string;
}
