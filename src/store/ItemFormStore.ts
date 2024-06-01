import { makeAutoObservable } from "mobx"
import { CustomField } from "../types/CustomField";
import { Tag } from "../types/Tag";
import { mapItemTagsToArray } from "../service/utils/itemUtils";

class ItemFormStore {
  customFields: CustomField[] = [];
  loading: boolean = false;
  loadingCustomFields: boolean = false;
  loadingTags: boolean = false;
  defaultValues: any;
  tagsOption: any;
  tagValue: string = "";
  selectedTags: any;
  tagErrorMessage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCustomFields(fields: CustomField[]) {
    this.customFields = fields;
  }

  setDefaultValues(values: any) {
    const { tags, ...data } = values;
    const tagsArray = mapItemTagsToArray(tags);
    this.selectedTags = tagsArray;
    this.defaultValues = data;
  }

  setTagsOption(options: Tag[]) {
    this.tagsOption = options;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setTagErrorMessage(message: string) {
    this.tagErrorMessage = message;
  }

  setLoadingTags(loading: boolean) {
    this.loadingTags = loading;
  }

  setTagValue(value: string) {
    this.tagValue = value;
  }

  setSelectedTags(tags: any) {
    this.selectedTags = tags;
  }

  setLoadingCustomFields(loading: boolean) {
    this.loadingCustomFields = loading;
  }

  validateTags(message: string) {
    this.tagErrorMessage =
      this.selectedTags?.length === 0 || this.selectedTags?.length === undefined
        ? message
        : "";
    return !this.tagErrorMessage;
  }
}
export default ItemFormStore