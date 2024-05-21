import { makeAutoObservable } from "mobx"

class PaginationStore {
  page: number = 1;
  totalPages: number = 0;
  limit: number = 15;

  constructor() {
    makeAutoObservable(this);
  }

  setPage(page: number) {
    this.page = page;
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }

  setLimit(limit: number) {
    this.limit = limit;
  }
}
export default PaginationStore