import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";
import { FullCollectionData } from "../types/collection-types/FullCollectionData";

class CollectionFormStore {
  customFields: CustomField[] = [];
  defaultValues: FullCollectionData = this.getDefaultValues();

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(field: CustomField) {
    this.customFields = [...this.customFields, field];
  }

  setDefaultCustomFields(fields: CustomField[]) {
    this.customFields = fields;
  }

  setDefaultValues(value: FullCollectionData) {
    this.defaultValues = value;
  }

  removeCustomField(index: number) {
    this.customFields.splice(index, 1);
  }

  getDefaultValues() {
    return {
      name: '',
      category: '',
      description: '',
      imageUrl: '',
      customFields: []
    }
  }
}
export default CollectionFormStore