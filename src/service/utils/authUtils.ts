import { UserData } from "../../api/auth"
import { openApiPaths } from "../../api/path/api-path"
import { logout } from "../../api/auth"
import axiosInstance from "../../config/axiosConfig"
import { refreshToken } from "../../api/auth"
import { AxiosResponse } from "axios"
import { Token } from "../../types/Token"

const setTokens = (token: UserData) => {
    localStorage.setItem("user", JSON.stringify(token))
}

const getTokens = () => {
  const token = localStorage.getItem("user");
  if (token) return JSON.parse(token);
}

const removeTokens = () => {
  localStorage.removeItem("user");
};

const updateAccessToken = (token: string) => {
  const tokens = getTokens();
  tokens.token = token;
  localStorage.setItem("user", JSON.stringify(tokens));
};

const getRefreshToken = () => {
  const tokens = getTokens();
  return tokens.refreshToken;
}

const updateRefreshToken = (token: string) => {
  const tokens = getTokens();
  tokens.refreshToken = token;
  localStorage.setItem("user", JSON.stringify(tokens));
}

const isOpenApiPath = (url: string) => {
  return openApiPaths.some(path => url.startsWith(path)) || url.startsWith("/open-api");
}

const handleFailedRefreshToken = () => {
  removeTokens();
  window.location.replace("/login?sessionExpired=true");
}

const handleLogout = async (logoutPath: string) => {
  try {
    await logout(getRefreshToken())
    removeTokens();
    window.location.replace(logoutPath);
  } catch (e) { console.error('Failed to logout', e) }
}

const handleAnotherStatus = async (err: any) => {
  if (checkStatus(err, 403)) handleLogout("/login?accessDenied=true");
  else if (checkStatus(err, 423)) handleLogout("/login?isBlocked=true");
  else return;
};

const checkStatus = (err: any, status: number) => {
  return !isOpenApiPath(err.config.url) && err.response?.status === status
}

const handleRefreshToken = async (originalConfig: any) => {
  try {
    const res = await refreshToken(getTokens()?.refreshToken)
    handleSuccessRefreshToken(res);
  } catch (error) {
    handleFailedRefreshToken();
    return Promise.reject(error);
  }
}

const handleSuccessRefreshToken = (res: AxiosResponse<Token, any>) => {
  updateAccessToken(res.data.token);
  updateRefreshToken(res.data.refreshToken);
};

export {
  setTokens,
  getTokens,
  removeTokens,
  updateAccessToken,
  updateRefreshToken,
  isOpenApiPath,
  handleFailedRefreshToken,
  handleAnotherStatus,
  handleRefreshToken
};