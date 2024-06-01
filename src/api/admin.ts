import axiosInstance from "../config/axiosConfig";
import { MessageApiResponse } from "../types/MessageApiResponse";
import { UserListResponse } from "../types/user-types/UserListResponse";

const API_URL = process.env.REACT_APP_URL || "";

const getListOfUsers = async (page: number) => {
  return axiosInstance.get<UserListResponse>(
    API_URL + `api/admin/get/users?page=${page}`
  );
};

const updateUserBlockedStatus = async (status: boolean, ids: number[]) => {
  return axiosInstance.put<MessageApiResponse>(
    API_URL + `api/admin/block/users`, { status, ids }
  );
};

const deleteUsers = async (ids: number[]) => {
  return axiosInstance.post<MessageApiResponse>(
    API_URL + `api/admin/delete/users`, { ids }
  );
};

const changeUserRole = async (ids: number[], userRole: string) => {
  return axiosInstance.put<MessageApiResponse>(
    API_URL + `api/admin/change/role`, { ids, userRole }
  );
};

export { getListOfUsers, updateUserBlockedStatus, deleteUsers, changeUserRole };
