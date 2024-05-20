import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";

class CollectionStore {
  customFields: CustomField[] = []

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(field: CustomField) {
    this.customFields = [...this.customFields, field]
  }

  removeCustomField(index: number) {
    this.customFields.splice(index, 1);
  }
}
export default new CollectionStore