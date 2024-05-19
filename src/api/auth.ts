import axios from "axios";
import { FormInput } from "../components/Registration";
import axiosInstance from "../config/axiosConfig";
import { Token } from "../types/Token";

const API_URL = process.env.REACT_APP_API_URL;

interface UserData {
  token: string;
  refreshToken: string;
  email: string;
}

const registerUser = async (regData: FormInput) => {
  return axiosInstance.post<UserData>('/register', regData);
};

const logout = async (refreshToken: string) => {
  return axios.post(API_URL + '/api/token/invalidate', {refreshToken});
};

const refreshToken = async (refreshToken: string) => {
  return axios.post<Token>(API_URL + '/api/token/refresh', {refreshToken});
};

const login = async (loginData: FormInput) => {
  return axiosInstance.post<UserData>('/api/login_check', loginData);
};

export type {UserData}
export {registerUser, logout, login, refreshToken}