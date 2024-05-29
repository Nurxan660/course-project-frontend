import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";

const API_URL = process.env.REACT_APP_URL || "";


const toggleLike = async (itemId: number) => {
  return axiosInstance.post<MessageApiResponse>(
    API_URL + `/api/likes/toggle?itemId=${itemId}`
  );
};


export { toggleLike };
