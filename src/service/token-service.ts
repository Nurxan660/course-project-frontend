import { Token } from "../api/auth"

const setTokens = (token: Token) => {
    localStorage.setItem("token", JSON.stringify(token))
}

const getTokens = () => {
  const token = localStorage.getItem("token");
  if (token) return JSON.parse(token);
}

const removeTokens = () => {
  localStorage.removeItem("token");
};

export {setTokens, getTokens, removeTokens}