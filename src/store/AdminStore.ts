import { makeAutoObservable } from "mobx"
import { UserListResponse } from "../types/user-types/UserListResponse";

class AdminStore {
  userListReponse: UserListResponse = {
    totalItems: 0,
    users: []
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
}
export default new AdminStore