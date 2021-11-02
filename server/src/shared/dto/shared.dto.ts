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
