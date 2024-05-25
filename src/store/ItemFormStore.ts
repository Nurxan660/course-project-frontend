import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";

class ItemFormStore {
  customFields: CustomField[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(fields: CustomField[]) {
    this.customFields = fields;
  }
}
export default new ItemFormStore