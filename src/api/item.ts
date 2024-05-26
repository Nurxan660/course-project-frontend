import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";

const API_URL = process.env.REACT_APP_URL || '';


const createItem = async (formData: any) => {
    return axiosInstance.post<MessageApiResponse>(API_URL + '/api/item/create', {...formData})
};

export { createItem };