import axios from "axios";
import { FormInput } from "../components/Registration";
import axiosInstance from "../config/axiosConfig";
const API_URL = process.env.REACT_APP_API_URL;

interface Token {
  token: string;
  refreshToken: string;
}

const registerUser = async (regData: FormInput) => {
  return axiosInstance.post<Token>('/register', regData);
};

const logout = async (refreshToken: string) => {
  return axios.post(API_URL + '/api/token/invalidate', {refreshToken});
};

const login = async (loginData: FormInput) => {
  return axiosInstance.post<Token>('/api/login_check', loginData);
};

export type {Token}
export {registerUser, logout, login}