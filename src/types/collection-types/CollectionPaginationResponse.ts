import { Collection } from "./Collection";

export interface CollectionPaginationResponse {
    totalPages: number;
    limit: number;
    collections: Collection[];
}