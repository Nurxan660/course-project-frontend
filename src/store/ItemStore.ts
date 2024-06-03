import { makeAutoObservable } from "mobx"
import { ItemWithLikesResponse } from "../types/item-types/ItemWithLikesResponse";

class ItemStore {
  item: ItemWithLikesResponse = {
    name: '',
    likesCount: 0,
    customFields: [],
    liked: false
  }
  loading: boolean = true;
  liked: boolean = false;
  

  constructor() {
    makeAutoObservable(this);
  }

  setItem(item: ItemWithLikesResponse) {
    this.item = item;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setLiked(liked: boolean) {
    this.liked = liked;
  }

  changeLikeCount() {
    if(this.item.likesCount < 1) {
      this.item.likesCount = this.item.likesCount + 1
    } else this.item.likesCount = this.item.likesCount - 1
  }
}
export default new ItemStore