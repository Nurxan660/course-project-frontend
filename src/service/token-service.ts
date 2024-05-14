import { UserData } from "../api/auth"

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

export {setTokens, getTokens, removeTokens}