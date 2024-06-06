import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";
import { FullCollectionData } from "../types/collection-types/FullCollectionData";

class CollectionFormStore {
  customFields: CustomField[] = [];
  defaultValues: FullCollectionData = this.getDefaultValues();
  isCustomFieldModalOpen: boolean = false;

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

  setIsCustomFieldModalOpen(isOpen: boolean) {
    this.isCustomFieldModalOpen = isOpen;
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
      public: false,
      customFields: []
    }
  }
}
export default CollectionFormStore