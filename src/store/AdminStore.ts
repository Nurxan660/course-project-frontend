import { makeAutoObservable } from "mobx"
import { UserListResponse } from "../types/user-types/UserListResponse";
import { changeUserRole, deleteUsers, updateUserBlockedStatus } from "../api/admin";
import { Id } from "react-toastify";

class AdminStore {
  userListReponse: UserListResponse = {
    totalItems: 0,
    users: [],
  };
  checkedUsers: number[] = [];
  isAction: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(userListReponse: UserListResponse) {
    this.userListReponse = userListReponse;
  }

  setIsAction(action: boolean) {
    this.isAction = action;
  }

  handleUserCheck = (userId: number) => {
    if (this.checkedUsers.includes(userId)) {
      this.checkedUsers = this.checkedUsers.filter((id) => id !== userId);
    } else {
      this.checkedUsers.push(userId);
    }
  };

  handleUserCheckAll = () => {
    if (this.checkedUsers.length === this.userListReponse.users.length) {
      this.checkedUsers = [];
    } else {
      this.checkedUsers = this.userListReponse.users.map((user) => user.id);
    }
  };

  handleBlockUser = async (
    status: boolean,
    notifySuccess: (message: string) => Id
  ) => {
    try {
      const res = await updateUserBlockedStatus(status, this.checkedUsers);
      this.setIsAction(!this.isAction);
      notifySuccess(res.data.message);
    } catch (e) {}
  };

  handleDeleteUser = async (notifySuccess: (message: string) => Id) => {
    try {
      const res = await deleteUsers(this.checkedUsers);
      this.setIsAction(!this.isAction);
      notifySuccess(res.data.message);
    } catch (e) {}
  };

  handleChangeUserRole = async (
    role: string,
    notifySuccess: (message: string) => Id
  ) => {
    try {
      const res = await changeUserRole(this.checkedUsers, role);
      this.setIsAction(!this.isAction);
      notifySuccess(res.data.message);
    } catch (e) {}
  };

  areAllUsersChecked = () => {
    return (
      this.checkedUsers.length === this.userListReponse.users.length &&
      this.userListReponse.users.length > 0
    );
  };
}
export default new AdminStore