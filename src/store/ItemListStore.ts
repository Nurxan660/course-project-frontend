import { makeAutoObservable } from "mobx"
import { PaginationItemListResponse } from "../types/item-types/PaginationItemListResponse";
import { BasicCollectionData } from "../types/collection-types/BasicCollectionData";

class ItemListStore {
  items: PaginationItemListResponse = {
    items: [],
    customFieldNames: [],
    totalPages: 0,
  };
  loading: boolean = false;
  checkedItems: number[] = [];
  collection: BasicCollectionData = {
    id: 0,
    name: '',
    category: '',
    description: '',
    imageUrl: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  handleCheckChange = (itemId: number) => {
    if (this.checkedItems.includes(itemId)) {
      this.checkedItems = this.checkedItems.filter((id) => id !== itemId);
    } else {
      this.checkedItems.push(itemId);
    }
  };

  handleCheckAll = () => {
    if (this.checkedItems.length === this.items.items.length) {
      this.checkedItems = [];
    } else {
      this.checkedItems = this.items.items.map((item) => item.itemId);
    }
  };

  setItems(items: PaginationItemListResponse) {
    this.items = items;
  }

  setCollection(collection: BasicCollectionData) {
    this.collection = collection;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
export default new ItemListStore