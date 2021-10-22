import { IsNotEmpty } from "class-validator";

export class ResponseProductsDTO {
  constructor(item: any, variantNumber?: number) {
    this.itemID = item.itemID;
    this.name = item.name;
    this.rating = item.rating;
    this.discount =
      item.variants && item.variants[variantNumber || 0]
        ? item.variants[variantNumber || 0].discount
        : 0;
    this.image =
      item.variants &&
      item.variants[variantNumber || 0] &&
      item.variants[variantNumber || 0].images
        ? item.variants[variantNumber || 0].images[0]
        : "";
    this.price =
      item.variants && item.variants[variantNumber || 0]
        ? item.variants[variantNumber || 0].price
        : 0;
    this.isLiked = item.isLiked;
  }

  itemID: string;
  name: number;
  rating: number;
  price: number;
  discount: string;
  image: string;
  isLiked: boolean;
}

export class GetItemDTO {
  @IsNotEmpty()
  itemID: string;
}

export class ResponseProductDTO {
  constructor(item: any) {
    this.itemID = item.itemID;
    this.name = item.name;
    this.rating = item.rating;
    this.description = item.description;
    this.variants = item.variants.map(
      (el) => new ResponseProductVariantsDTO(el)
    );
    this.mayLike = item.mayLike;
    this.comments = item.comments;
    this.isAlreadyBought = false;
  }

  itemID: string;
  name: number;
  rating: number;
  description: string;
  variants: Array<any>;
  mayLike: any;
  comments: any;
  isAlreadyBought: boolean;
}

export class ResponseProductVariantsDTO {
  constructor(item: any) {
    this.variantID = item.variantID;
    this.name = item.name;
    this.quantity = item.quantity;
    this.price = item.price;
    this.discount = item.discount;
    this.status = item.status || "disabled";
    this.tax = item.tax;
    this.images = item.images;
  }

  variantID: string;
  status: string;
  quantity: number;
  price: number;
  discount: number;
  tax: number;
  name: string;
  images: Array<any>;
}

export class AddCommentDTO {
  itemID: string;
  rating: number;
  description: string;
  title: string;
  count?: number;
}

export class GetCommentsDTO {
  itemID: string;
  limit?: number;
  offset?: number;
}

export class LikeCommentDTO {
  itemID: string;
  commentID: string;
}

export class ResponseCommentDTO {
  constructor(item: any) {
    this.name = item.name;
    this.id = item.id;
    this.rating = item.rating;
    this.title = item.title;
    this.description = item.description;
    this.date = item.date;
    this.dislikes = item.dislikes;
    this.likes = item.likes;
    this.avatar = item.avatar;
    this.isLiked = item.isLiked || false;
    this.isDisliked = item.isDisliked || false;
  }

  id: string;
  name: number;
  rating: number;
  title: string;
  description: string;
  date: string;
  dislikes: number;
  likes: number;
  avatar: string;
  isLiked: boolean;
  isDisliked: boolean;
}
