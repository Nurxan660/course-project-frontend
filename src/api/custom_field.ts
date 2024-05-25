import axiosInstance from "../config/axiosConfig";
import { CustomField } from "../types/CustomField";
const API_URL = process.env.REACT_APP_URL || '';


const getCollectionCustomFields = async (collectionId: number) => {
    return axiosInstance.get<CustomField[]>(API_URL + `/api/customFields/get?collectionId=${collectionId}`)
};

export { getCollectionCustomFields };