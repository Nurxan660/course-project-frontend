import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";

class ItemFormStore {
  customFields: CustomField[] = [];
  loading: boolean = false;
  defaultValues: any;

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(fields: CustomField[]) {
    this.customFields = fields;
  }

  setDefaultValues(values: any) {
    this.defaultValues = values;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
export default ItemFormStore