import { makeAutoObservable } from "mobx"
import { CollectionWithItemsResponse } from "../types/item-types/CollectionWithItemsResponse";

class ItemListStore {
  items: CollectionWithItemsResponse = {
    name: "",
    categoryName: "",
    description: "",
    imageUrl: "",
    items: [],
    customFieldNames: [],
    totalPages: 0,
  };
  loading: boolean = false;
  checkedItems: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleCheckChange = (itemId: number) => {
    if (this.checkedItems.includes(itemId)) {
      this.checkedItems = this.checkedItems.filter((id) => id !== itemId);
    } else {
      this.checkedItems.push(itemId);
    }
  }

  handleCheckAll = () => {
    if (this.checkedItems.length === this.items.items.length) {
      this.checkedItems = [];
    } else {
      this.checkedItems = this.items.items.map((item) => item.itemId);
    }
  }

  setItems(items: CollectionWithItemsResponse) {
    this.items = items;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
export default new ItemListStore