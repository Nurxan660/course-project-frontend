import axiosInstance from "../config/axiosConfig";
import { PopularTag } from "../types/PopularTag";

const API_URL = process.env.REACT_APP_URL || "";


const getPopularTags = async () => {
  return axiosInstance.get<PopularTag[]>(
    API_URL + `/open-api/tag/get/popular`
  );
};


export { getPopularTags };
