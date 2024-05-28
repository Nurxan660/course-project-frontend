import { ItemListResponse } from "./ItemListResponse";

interface PaginationItemListResponse {
    items: ItemListResponse[]
    customFieldNames: []
    totalPages: number;
  }
  export type { PaginationItemListResponse };
  