import axios from "axios";
import { RegFormInput } from "../components/Registration";
import axiosInstance from "../config/axiosConfig";
import { Token } from "../types/Token";
import { LoginFormInput } from "../components/Login";

const API_URL = process.env.REACT_APP_API_URL;

interface UserData {
  role: string;
  token: string;
  refreshToken: string;
  fullName: string;
}

const registerUser = async (regData: RegFormInput) => {
  return axiosInstance.post<UserData>('/register', regData);
};

const logout = async (refreshToken: string) => {
  return axios.post(API_URL + '/api/token/invalidate', {refreshToken});
};

const refreshToken = async (refreshToken: string) => {
  return axios.post<Token>(API_URL + '/api/token/refresh', {refreshToken});
};

const login = async (loginData: LoginFormInput) => {
  return axiosInstance.post<UserData>('/api/login_check', loginData);
};

export type {UserData}
export {registerUser, logout, login, refreshToken}