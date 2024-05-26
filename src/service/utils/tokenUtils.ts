import { UserData } from "../../api/auth"

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

const updateRefreshToken = (token: string) => {
  const tokens = getTokens();
  tokens.refreshToken = token;
  localStorage.setItem("user", JSON.stringify(tokens));
}

export {setTokens, getTokens, removeTokens, updateAccessToken, updateRefreshToken}