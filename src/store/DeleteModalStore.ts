import { makeAutoObservable } from "mobx"


class DeleteModalStore {
  showModal: boolean = false;
  onDeleteCallback: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openModal(onDeleteCallback: () => void) {
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
    this.closeModal();
  }
}
export default new DeleteModalStore