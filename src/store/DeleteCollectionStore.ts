import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";
import { Collection } from "../types/collection-types/Collection";
import DeleteModalStore from "./DeleteModalStore";
import { Id } from "react-toastify";
import { TFunction } from "i18next";
import { deleteCollection } from "../api/collection";
import { AxiosResponse } from "axios";
import { getCollections } from "../api/collection";
import PaginationStore from "./PaginationStore";
import { CollectionPaginationResponse } from "../types/collection-types/CollectionPaginationResponse";

class CollectionStore {
  collections: Collection[] = [];
  loading: boolean = true;
  collectionId: number | null = null;
  isDeleted: boolean = false;
  checkedItems: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  areAllCollectionsChecked = () => {
    return (
      this.checkedItems.length === this.collections.length &&
      this.collections.length > 0
    );
  }

  setCollections(collections: Collection[]) {
    this.collections = collections;
  }

  setCheckedItems(checkedItems: number[]) {
    this.checkedItems = checkedItems;
  }

  setLoading(isLoading: boolean) {
    this.loading = isLoading;
  }

  setCollectionId(collectionId: number) {
    this.collectionId = collectionId;
  }

  setIsDeleted() {
    this.isDeleted = !this.isDeleted;
  }

  async deleteCollection(
    notifySuccess: (message: string) => Id,
    notifyError: (message: string) => Id,
    t: TFunction<"translation", undefined>,
    store: PaginationStore
  ) {
    try {
      DeleteModalStore.setLoading(true);
      const res = await deleteCollection(this.checkedItems);
      this.handleSuccessDelete(res, notifySuccess, store);
    } catch (e) { notifyError(t("unexpectedError")) }
    DeleteModalStore.setLoading(false);
  }

  handleSuccessDelete(
    res: AxiosResponse<any, any>,
    notifySuccess: (message: string) => Id,
    store: PaginationStore
  ) {
    this.setIsDeleted();
    DeleteModalStore.closeModal();
    this.adjustCurrentPageAfterDeletion(store);
    notifySuccess(res.data?.message);
  }

  async handleLoadCollection(
    store: PaginationStore | null,
    notifyError: (message: string) => Id,
    t: TFunction<"translation", undefined>
  ) {
    try {
      this.setLoading(true);
      const res = await getCollections(store?.page || 1);
      this.handleSuccessGetCollections(store, res);
    } catch (e) { notifyError('unexpectedError') }
    this.setLoading(false);
  }


  private handleSuccessGetCollections(
    store: PaginationStore | null,
    res: AxiosResponse<CollectionPaginationResponse, any>
  ) {
    store?.setTotalPages(res.data.totalPages);
    store?.setLimit(res.data.limit);
    this.setCollections(res.data.collections);
  }

  adjustCurrentPageAfterDeletion(store: PaginationStore) {
    if (store.page > 1 && store.totalPages % store.limit === 1) {
      store.setPage(store.page - 1);
    }
  }

  handleCheckChange = (id: number) => {
    if (this.checkedItems.includes(id)) {
      this.checkedItems = this.checkedItems.filter((id) => id !== id);
    } else {
      this.checkedItems.push(id);
    }
  };

  handleCheckAll = () => {
    if (this.checkedItems.length === this.collections.length) {
      this.checkedItems = [];
    } else {
      this.checkedItems = this.collections.map((collection) => collection.id);
    }
  };
}
export default new CollectionStore