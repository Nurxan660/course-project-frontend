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
  customFields: CustomField[] = [];
  collections: Collection[] = [];
  loading: boolean = true;
  collectionId: number | null = null;
  isDeleted: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(field: CustomField) {
    this.customFields = [...this.customFields, field];
  }

  removeCustomField(index: number) {
    this.customFields.splice(index, 1);
  }

  setCollections(collections: Collection[]) {
    this.collections = collections;
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
      await this.performDelete(notifySuccess, store);
    } catch (e) { notifyError(t("unexpectedError")) }
    DeleteModalStore.setLoading(false);
  }

  private async performDelete(notifySuccess: (message: string) => Id, store: PaginationStore) {
    if (!this.collectionId) return;
    const res = await deleteCollection(this.collectionId);
    this.handleSuccessDelete(res, notifySuccess);
    this.adjustCurrentPageAfterDeletion(store);
  }

  private handleSuccessDelete(
    res: AxiosResponse<any, any>,
    notifySuccess: (message: string) => Id
  ) {
    this.setIsDeleted();
    DeleteModalStore.closeModal();
    notifySuccess(res.data?.message);
  }

  async handleLoadCollection(
    store: PaginationStore | null,
    notifyError: (message: string) => Id,
    t: TFunction<"translation", undefined>
  ) {
    try {
      this.setLoading(true);
      await this.loadCollections(store);
    } catch {
      notifyError(t("unexpectedError"));
    }
    this.setLoading(false);
  }

  private async loadCollections(store: PaginationStore | null) {
    const res = await getCollections(store?.page || 1);
    this.handleSuccessGetCollections(store, res);
  }

  private handleSuccessGetCollections(
    store: PaginationStore | null,
    res: AxiosResponse<CollectionPaginationResponse, any>
  ) {
    store?.setTotalPages(res.data.totalPages);
    store?.setLimit(res.data.limit);
    this.setCollections(res.data.collections);
  }

  private adjustCurrentPageAfterDeletion(store: PaginationStore) {
    if (store.page > 1 && store.totalPages % store.limit === 1) {
      store.setPage(store.page - 1);
    }
  }
}
export default new CollectionStore