import { IsEmail, IsNotEmpty } from "class-validator";

export class EditFuserDTO {
  userID?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  sex?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  wishlist?: Array<any>;
  viewed?: Array<any>;
  orders?: Array<any>;
}

export class DeleteFuserDTO {
  @IsNotEmpty()
  userID: string;
  password?: string;
  group?: string;
  firstName?: string;
  lastName?: string;
}

export class ResponseUserDto {
  constructor(user) {
    this.userID = user.userID;
    this.firstName = user.userMain.firstName;
    this.lastName = user.userMain.lastName;
    this.email = user.contacts.email;
    return this;
  }
  @IsNotEmpty()
  userID: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  firstName?: string;
  lastName?: string;
}

export class PaginationDTO {
  offset?: number;
  limit?: number;
}

export class ViewedDTO {
  constructor(item: any) {
    this.itemID = item.itemID;
    this.name = item.name;
    this.rating = item.rating;
    this.description = item.description;
    this.total = item.total;
    this.image =
      item.variants[0] && item.variants[0].images && item.variants[0].images[0]
        ? item.variants[0].images[0]
        : "";
    this.price =
      item.variants[0] && item.variants[0].price ? +item.variants[0].price : 0;
    this.discount =
      item.variants[0] && item.variants[0].discount
        ? +item.variants[0].discount
        : 0;
    this.publishDate = item.publishDate || new Date(0);
    this.status = item.status || "";
  }

  @IsNotEmpty()
  itemID: string;
  description: string;
  name: number;
  rating: number;
  price: number;
  discount: number;
  total: string;
  image: string;
  isLiked: boolean;
  archiveDate: Date;
  publishDate: Date;
  status: string;
}
