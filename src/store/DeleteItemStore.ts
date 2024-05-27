import { makeAutoObservable } from "mobx";
import DeleteModalStore from "./DeleteModalStore";
import { Id } from "react-toastify";
import { TFunction } from "i18next";
import PaginationStore from "./PaginationStore";
import { deleteItem as deleteItemApi } from "../api/item";
import ItemListStore from "./ItemListStore";
import DeleteCollectionStore from "./DeleteCollectionStore";
import { AxiosResponse } from "axios";

class DeleteItemStore {
  isDeleted: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.handleSuccessDelete = this.handleSuccessDelete.bind(this);
  }

  setIsDeleted() {
    this.isDeleted = !this.isDeleted;
  }

  async deleteItem(
    notifySuccess: (message: string) => Id,
    notifyError: (message: string) => Id,
    t: TFunction<"translation", undefined>,
    store: PaginationStore
  ) {
    try {
      DeleteModalStore.setLoading(true);
      const res = await deleteItemApi(ItemListStore.checkedItems);
      this.handleSuccessDelete(res, notifySuccess);
      DeleteCollectionStore.adjustCurrentPageAfterDeletion(store);
    } catch (e) { notifyError(t("unexpectedError"))}
    DeleteModalStore.setLoading(false);
  }

  handleSuccessDelete(
    res: AxiosResponse<any, any>,
    notifySuccess: (message: string) => Id
  ) {
    this.setIsDeleted();
    DeleteModalStore.closeModal()
    notifySuccess(res.data?.message);
  }
}
export default new DeleteItemStore();
