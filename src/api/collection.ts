import axiosInstance from "../config/axiosConfig";
import { CollectionCategory } from "../types/collection-types/CollectionCategory";
import { FullCollectionData } from "../types/collection-types/FullCollectionData";
import { CollectionPaginationResponse } from "../types/collection-types/CollectionPaginationResponse";
import { BasicCollectionData } from "../types/collection-types/BasicCollectionData";
import { LargestCollections } from "../types/collection-types/LargestCollections";

const API_URL = process.env.REACT_APP_URL || '';


const getCollectionCategories = async () => {
    return axiosInstance.get<CollectionCategory[]>(API_URL + '/api/collections/category')
};

const createCollection = async (formData: FullCollectionData) => {
    return axiosInstance.post(API_URL + '/api/collections/create', {...formData})
};

const getCollections = async (page: number) => {
    return axiosInstance.get<CollectionPaginationResponse>(
      API_URL + `/api/collections/get?page=${page}`
    );
};

const deleteCollection = async (collectionId: number) => {
    return axiosInstance.delete(
      API_URL + `/api/collections/delete?collectionId=${collectionId}`
    );
};

const getCollection = async (collectionId: number) => {
  return axiosInstance.get<FullCollectionData>(
    API_URL + `/api/collections/get/collection?collectionId=${collectionId}`
  );
};

const getCollectionBasic = async (collectionId: number) => {
  return axiosInstance.get<BasicCollectionData>(
    API_URL + `/open-api/collections/get/collection/basic?collectionId=${collectionId}`
  );
};

const editCollection = async (formData: FullCollectionData, collectionId: number) => {
  return axiosInstance.put(API_URL + `/api/collections/edit?collectionId=${collectionId}`, {...formData})
};

const getLargestCollections = async () => {
  return axiosInstance.get<LargestCollections[]>(
    API_URL + `/open-api/collections/get`
  );
};

export {
  getCollectionCategories,
  createCollection,
  getCollections,
  deleteCollection,
  getCollection,
  editCollection,
  getCollectionBasic,
  getLargestCollections
};