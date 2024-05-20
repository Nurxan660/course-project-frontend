import axiosInstance from "../config/axiosConfig";
import { CollectionCategory } from "../types/CollectionCategory";
import { FullCollectionData } from "../types/FullCollectionData";

const API_URL = process.env.REACT_APP_URL || '';


const getCollections = async () => {
    return axiosInstance.get<CollectionCategory[]>(API_URL + '/api/collections/category')
};

const createCollection = async (formData: FullCollectionData) => {
    return axiosInstance.post(API_URL + '/api/collections/create', {...formData})
};

export {getCollections, createCollection}