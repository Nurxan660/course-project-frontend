import { makeAutoObservable } from "mobx"
import { CollectionWithItemsResponse } from "../types/item-types/CollectionWithItemsResponse";

class ItemListStore {
  items: CollectionWithItemsResponse = {
    name: '', 
    categoryName: '', 
    description: '', 
    imageUrl: '', 
    items: [],
    customFieldNames: [],
    totalPages: 0
  };
  loading: boolean = false;
 
  constructor() {
    makeAutoObservable(this);
  }

  setItems(items: CollectionWithItemsResponse) {
    this.items = items;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
export default new ItemListStore