import { IsNotEmpty } from "class-validator";

export class AddModuleDTO {
  @IsNotEmpty()
  name: string;
  fields?: Array<any>;
  icon?: string;
  categories: boolean;
}

export class AddItemDTO {
  data: any;
}

export class EditItemDTO {
  data: any;
}

export class EditItemsOrderDTO {
  moduleName: string;
  items: object;
}

export class EditModuleDTO {
  @IsNotEmpty()
  moduleID: string;
  name?: string;
  fields?: Array<any>;
  icon?: string;
}

export class AddFieldsDTO {
  @IsNotEmpty()
  moduleID: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  settings: Array<any>;
}

export class EditFieldsDTO {
  @IsNotEmpty()
  id: string;
  name?: string;
  type?: string;
  settings?: Array<any>;
}

export class EditFieldsOrderDTO {
  @IsNotEmpty()
  moduleID: string;
  @IsNotEmpty()
  fields: Array<any>;
}

export class DeleteFieldsDTO {
  id: string;
}

export class ModuleIDDTO {
  moduleID: string;
}

export class ModuleNameDTO {
  name: string;
}

export class DeleteModuleDTO {
  moduleID: string;
}

export class DeleteItemDTO {
  itemID: string;
  moduleName: string;
}

export class EditItemsDTO {
  moduleName: string;
  itemID: string;
  newItem: Record<any, any>;
}

export class AddItemCategoryDTO {
  moduleName: string;
  itemID: string;
  categoryID: string;
}

export class GetItemCategoriesDTO {
  moduleName: string;
  itemID: string;
}

export class GetItemsCountDTO {
  moduleName: string;
  itemID: string;
  variantID: string;
}

export class AddVariantDTO {
  itemID: string;
  moduleName: string;
}
// export declare class DeleteVariantDTO {
//   moduleName: string;
//   variantID: string;
//   itemID: string;
// }
// export declare class EditVariantDTO {
//   data: any;
// }
export class GetVariantsDTO {
  itemID: string;
}
export class DeleteVariantDTO {
  variantID: string;
  itemID: string;
}

export class EditVariantDTO {
  moduleName: string;
  variantID: string;
  itemID: string;
  name?: string;
  quantity?: string;
  werehouse?: string;
  price?: string;
  discount?: string;
  tax?: string;
}

export class EditVariantsOrderDTO {
  moduleName: string;
  variants: object;
}

export class GetItemVariantsDTO {
  moduleName: string;
  itemID: string;
}

export class SetVariantStockDTO {
  moduleName: string;
  itemID: string;
  variantID: string;
  storage: Array<any>;
}

export class DeleteItemCategoryDTO {
  moduleName: string;
  itemID: string;
  categoryID: string;
}

export class ResponseItemsDTO {
  constructor(item: any) {
    this.itemID = item.itemID;
    this.name = item.name;
    this.rating = item.rating;
    this.description = item.description;
    this.defaultPrice = item.defaultPrice;
    this.image =
      item.variants && item.variants[0] && item.variants[0].images
        ? item.variants[0].images[0]
        : "";
    this.price = item.variants && item.variants[0] ? item.variants[0].price : 0;
    this.publishDate = item.publishDate || new Date(0);
    this.status = item.status || "";
    this.archiveDate = item.archiveDate || new Date(0);
  }

  itemID: string;
  description: string;
  name: number;
  rating: number;
  defaultPrice: number;
  price: string;
  image: string;
  isLiked: boolean;
  archiveDate: Date;
  publishDate: Date;
  status: string;
}

export class ResponseItemDto {
  constructor(item: Record<any, any>) {
    this.itemID = item.itemID;
    this.name = item.name;
    this.rating = item.rating;
    this.description = item.description;
    this.variants = item.variants;
  }

  itemID: string;
  name: number;
  rating: number;
  description: string;
  variants: Array<any>;
}

export class WishListDTO {
  itemId: string;
  moduleName: string;
}

export class PaginationDTO {
  offset?: number;
  limit?: number;
}

export class GetItemsDTO {
  offset?: number;
  limit?: number;
  name?: string;
  category?: string;
}

export class OrderItemsDTO {
  constructor(item: any) {
    this.itemID = item.itemID;
    this.name = item.name;
    this.image = item.image;
    this.variants = item.variants;
    this.productQuantity = item.productQuantity;
    this.price = item.price;
    this.status = item.status || "";
  }

  itemID: string;
  name: number;
  variants: Array<any>;
  image: string;
  publishDate: string;
  status: string;
  productQuantity: number;
  price: number;
  archiveDate: string;
}

export class OrderProductsDTO {
  constructor(item: any) {
    this.itemID = item.itemID;
    this.name = item.name;
    this.image =
      item.variants && item.variants[0] && item.variants[0].images
        ? item.variants[0].images[0]
        : "";
    this.productQuantity = +item.productQuantity;
    this.price =
      item.variants && item.variants[0] ? +item.variants[0].price : 0;
  }

  itemID: string;
  name: number;
  image: string;
  productQuantity: number;
  price: number;
}

export class DeleteItemFromWishListDTO {
  itemId: string;
  moduleName: string;
  offset?: number;
  limit?: number;
}

export class ItemsFiltration {
  name: string;
  category: string;
}

export declare class FieldsDTO {
  fields: string;
}

export class MarkNewsDTO {
  itemID: string;
  type: string;
}

export interface EditWebshopVariantDTO {
  data: any;
}
