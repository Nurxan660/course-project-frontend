import axiosInstance from "../config/axiosConfig";
import { CollectionCategory } from "../types/collection-types/CollectionCategory";
import { FullCollectionData } from "../types/collection-types/FullCollectionData";
import { CollectionPaginationResponse } from "../types/collection-types/CollectionPaginationResponse";

const API_URL = process.env.REACT_APP_URL || '';


const getCollectionCategories = async () => {
    return axiosInstance.get<CollectionCategory[]>(API_URL + '/api/collections/category')
};

const createCollection = async (formData: FullCollectionData) => {
    return axiosInstance.post(API_URL + '/api/collections/create', {...formData})
};

const getCollections = async (page: number) => {
    return axiosInstance.get<CollectionPaginationResponse>(API_URL + `/api/collections/get?page=${page}`)
};

export {getCollectionCategories, createCollection, getCollections}