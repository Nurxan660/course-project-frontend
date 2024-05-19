import axiosInstance from "../config/axiosConfig";
import { CollectionCategory } from "../types/CollectionCategory";

const API_URL = process.env.REACT_APP_URL || '';


const getCollections = async () => {
    return axiosInstance.get<CollectionCategory[]>(API_URL + '/api/collections/category')
};

export {getCollections}