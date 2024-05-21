import axios from "axios";
import { getTokens, updateAccessToken, updateRefreshToken, removeTokens } from "../service/token-service";
import { openApiPaths } from "../api/path/api-path";
import { refreshToken } from "../api/auth";
import { getCurrentLanguageCode } from "../service/utils/langUtils";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL
});

async function handleRefreshToken(originalConfig: any) {
  try {
    const res = await refreshToken(getTokens()?.refreshToken)
    updateAccessToken(res.data.token);
    updateRefreshToken(res.data.refreshToken);
    return axiosInstance(originalConfig);
  } catch (error) {
    handleFailedRefresh();
    return Promise.reject(error);
  }
}

function handleFailedRefresh() {
  removeTokens();
  window.location.replace("/login?sessionExpired=true");
}

axiosInstance.interceptors.request.use((config) => {
  const token = getTokens()?.token;
  if (token && !openApiPaths.includes(config.url || ""))
    config.headers.Authorization = `Bearer ${token}`;
  const currentLanguage = getCurrentLanguageCode()?.replace(/['"]+/g, "");
  config.headers["Accept-Language"] = currentLanguage;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalConfig = err.config;
    if (!openApiPaths.includes(originalConfig.url) && err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      return handleRefreshToken(originalConfig);
    }
  return Promise.reject(err);
}
);

export default axiosInstance