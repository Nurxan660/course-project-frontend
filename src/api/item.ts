import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";
import { PaginationItemListResponse } from "../types/item-types/PaginationItemListResponse";
import { EditItemRequest } from "../types/item-types/EditItemRequest";

const API_URL = process.env.REACT_APP_URL || "";

const createItem = async (formData: any) => {
  return axiosInstance.post<MessageApiResponse>(API_URL + "/api/item/create", {
    ...formData,
  });
};

const getItemList = async (collectionId: number, page: number) => {
  return axiosInstance.get<PaginationItemListResponse>(
    API_URL + `/api/item/get/items?collectionId=${collectionId}&page=${page}`
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

export { createItem, getItemList, deleteItem, editItem };
