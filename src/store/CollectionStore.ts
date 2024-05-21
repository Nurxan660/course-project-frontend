import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";
import { Collection } from "../types/collection-types/Collection";

class CollectionStore {
  customFields: CustomField[] = []
  collections: Collection[] = []
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(field: CustomField) {
    this.customFields = [...this.customFields, field]
  }

  removeCustomField(index: number) {
    this.customFields.splice(index, 1);
  }

  setCollections(collections: Collection[]) {
    this.collections = collections;
  }

  setLoading(isLoading: boolean) {
    this.loading = isLoading;
  }
}
export default new CollectionStore