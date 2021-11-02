export class AddCategoryDTO {
  data: any;
}

export class EditCategoryDTO {
  data: any;
}

export class CategoryIDDTO {
  categoryID: string;
}

export class GetCategoryDTO {
  search: string;
}

export class PopularCategoriesDTO {
  constructor(item: any) {
    this.categoryImage = item.categoryImage;
    this.name = item.name;
    this.description = item.description;
    this.categoryID = item.categoryID;
  }
  categoryImage: string;
  name: string;
  description: string;
  categoryID: string;
}

export class QueryDTO {
  search?: string;
  limit?: number;
  offset?: number;
  sortField?: string;
  sortParameter?: string;
}

export class CategoryItemsDTO {
  categoryID: string;
  search?: {
    color: string[];
    shape: string[];
  };
  price?: {
    from?: number;
    to?: number;
  };
  limit?: number;
  offset?: number;
  sortField?: string;
  sortParameter?: string;
  excludedItemID?: string;
}
