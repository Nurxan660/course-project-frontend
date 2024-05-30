import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";
import { UserListResponse } from "../types/user-types/UserListResponse";

const API_URL = process.env.REACT_APP_URL || "";

const getListOfUsers = async (page: number) => {
  return axiosInstance.get<UserListResponse>(
    API_URL + `/admin/get/users?page=${page}`
  );
};

const updateUserBlockedStatus = async (status: boolean, ids: number[]) => {
  return axiosInstance.put<MessageApiResponse>(
    API_URL + `/admin/block/users`, { status, ids }
  );
};

export { getListOfUsers, updateUserBlockedStatus };
