import { makeAutoObservable } from "mobx"
import CollectionStore from "./DeleteCollectionStore";

class DeleteModalStore {
  showModal: boolean = false;
  onDeleteCallback: (() => void) | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  openModal(onDeleteCallback: () => void, collectionId: number) {
    this.showModal = true;
    CollectionStore.setCollectionId(collectionId)
    this.onDeleteCallback = onDeleteCallback;
  }

  openModalForDeleteItem(onDeleteCallback: () => void) {
    this.showModal = true;
    this.onDeleteCallback = onDeleteCallback;
  }

  closeModal() {
    this.showModal = false;
    this.onDeleteCallback = null;
  }

  confirmDelete() {
    if (this.onDeleteCallback) {
      this.onDeleteCallback();
    }
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
export default new DeleteModalStore