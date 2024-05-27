import { ItemListResponse } from "./ItemListResponse";

interface CollectionWithItemsResponse {
    name: string;
    categoryName: string;
    description: string;
    imageUrl: string;
    items: ItemListResponse[]
    customFieldNames: []
    totalPages: number;
  }
  export type { CollectionWithItemsResponse };
  