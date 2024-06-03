import axiosInstance from "../config/axiosConfig";
import axios from "axios";
import { MessageApiResponse } from "../types/MessageApiResponse";

const API_URL = process.env.REACT_APP_URL || "";


const toggleLike = async (itemId: number) => {
  return axiosInstance.post<MessageApiResponse>(
    API_URL + `/api/likes/toggle?itemId=${itemId}`
  );
};

const getTranslation = async (text: string, sourceLang: string, targetLang: string) => {
  return axios.post("https://ru.libretranslate.com/translate", {
    q: text,
    source: sourceLang,
    target: targetLang,
    format: "text",
  });
};


export { toggleLike, getTranslation };