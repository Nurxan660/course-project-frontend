import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use(config => {
  const currentLanguage = localStorage.getItem('lang')?.replace(/['"]+/g, '');
  config.headers['Accept-Language'] = currentLanguage;
  return config;
});

export default axiosInstance