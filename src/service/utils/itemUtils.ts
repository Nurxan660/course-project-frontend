import { EditItemRequest } from "../../types/item-types/EditItemRequest";

const transformItemCreateData = (data: any, collectionId: number) => {
  const { name, tags, ...customFieldsData } = data;
  const arrayTags = mapTagsToArray(String(tags))
  return { name, tags: arrayTags, collectionId, customFieldValues: customFieldsData };
};

const transformItemEditData = (data: any): EditItemRequest => {
  const { name, tags, ...customFieldsData } = data;
  const arrayTags = mapTagsToArray(String(tags))
  return { name, tags: arrayTags, customFields: customFieldsData  };
};

const mapTagsToArray = (tags: string) => {
  return String(tags)
    .split(",")
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag !== "");
};

export { transformItemCreateData, transformItemEditData};
