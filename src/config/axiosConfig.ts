import axios from "axios";
import { getTokens } from "../service/utils/authUtils";
import { getCurrentLanguageCode } from "../service/utils/langUtils";
import { isOpenApiPath } from "../service/utils/authUtils";
import { handleRefreshToken } from "../service/utils/authUtils";
import { handleAnotherStatus } from "../service/utils/authUtils";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL
});


axiosInstance.interceptors.request.use((config) => {
  const token = getTokens()?.token;
  if (token && !isOpenApiPath(config.url || ""))
    config.headers.Authorization = `Bearer ${token}`;
  const currentLanguage = getCurrentLanguageCode()?.replace(/['"]+/g, "");
  config.headers["Accept-Language"] = currentLanguage;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const config = err.config;
    const tokenObj = getTokens();
    if (tokenObj?.token && !isOpenApiPath(config.url) && err.response?.status === 401 && !config._retry) {
      config._retry = true;
      await handleRefreshToken(config);
      return axiosInstance(config);
    }
    handleAnotherStatus(err);
  return Promise.reject(err);
}
);

export default axiosInstance