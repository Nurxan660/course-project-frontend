import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";

class ItemFormStore {
  customFields: CustomField[] = [];
  loading: boolean = false;
  isEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(fields: CustomField[]) {
    this.customFields = fields;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
export default ItemFormStore