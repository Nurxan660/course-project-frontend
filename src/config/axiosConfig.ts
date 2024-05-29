import axios from "axios";
import { getTokens, updateAccessToken, updateRefreshToken, removeTokens } from "../service/utils/tokenUtils";
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

function isOpenApiPath(url: string) {
  return openApiPaths.some(path => url.startsWith(path)) || url.startsWith("/open-api");
}

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
    const token = getTokens()?.token;
    if (token && !isOpenApiPath(config.url) && err.response?.status === 401 && !config._retry) {
      config._retry = true;
      return handleRefreshToken(config);
    }
  return Promise.reject(err);
}
);

export default axiosInstance