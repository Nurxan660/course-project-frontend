import { makeAutoObservable } from "mobx"
import { ItemSearchResponse } from "../types/item-types/ItemSearchResponse";

class SearchStore {
  searchResult: ItemSearchResponse[] = [];
  value: string = ''
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchResult(result: ItemSearchResponse[]) {
    this.searchResult = result;
  }

  setValue(value: string) {
    this.value = value;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

export default new SearchStore;