import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";
import { CollectionWithItemsResponse } from "../types/item-types/CollectionWithItemsResponse";

const API_URL = process.env.REACT_APP_URL || '';


const createItem = async (formData: any) => {
    return axiosInstance.post<MessageApiResponse>(API_URL + '/api/item/create', {...formData})
};

const getItemListWithCollection = async (collectionId: number, page: number) => {
    return axiosInstance.get<CollectionWithItemsResponse>(
      API_URL + `/api/item/get/items?collectionId=${collectionId}&page=${page}`
    );
};

export { createItem, getItemListWithCollection };