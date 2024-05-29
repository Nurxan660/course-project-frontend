import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";
import { PaginationItemListResponse } from "../types/item-types/PaginationItemListResponse";
import { EditItemRequest } from "../types/item-types/EditItemRequest";
import { ItemWithLikesResponse } from "../types/item-types/ItemWithLikesResponse";
import { LastAddedItemsResponse } from "../types/item-types/LastAddedItemsResponse";

const API_URL = process.env.REACT_APP_URL || "";

const createItem = async (formData: any) => {
  return axiosInstance.post<MessageApiResponse>(API_URL + "/api/item/create", {
    ...formData,
  });
};

const getItemList = async (collectionId: number, page: number) => {
  return axiosInstance.get<PaginationItemListResponse>(
    API_URL + `/open-api/item/get/items?collectionId=${collectionId}&page=${page}`
  );
};

const getItemWithLikes = async (itemId: number) => {
  return axiosInstance.get<ItemWithLikesResponse>(
    API_URL + `/open-api/item/get/item?itemId=${itemId}`
  );
};

const deleteItem = async (ids: number[]) => {
  return axiosInstance.post<MessageApiResponse>(API_URL + `/api/item/delete`, {
    ids,
  });
};

const editItem = async (itemId: number, body: EditItemRequest) => {
  return axiosInstance.put<MessageApiResponse>(
    API_URL + `/api/item/edit?itemId=${itemId}`,
    body
  );
};

const getLastAddedItems = async () => {
  return axiosInstance.get<LastAddedItemsResponse[]>(
    API_URL + `/open-api/item/get/last-added-items`);
};

export { createItem, getItemList, deleteItem, editItem, getItemWithLikes, getLastAddedItems };
