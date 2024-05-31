import { Tag } from "../../types/Tag";
import { EditItemRequest } from "../../types/item-types/EditItemRequest";

const transformItemCreateData = (data: any, collectionId: number, tags: []) => {
  const { name, ...customFieldsData } = data;
  const mappedTags = mapTags(tags);
  return { name, tags: mappedTags, collectionId, customFieldValues: customFieldsData };
};

const transformItemEditData = (data: any, tags: []): EditItemRequest => {
  const { name, ...customFieldsData } = data;
  const mappedTags = mapTags(tags);
  return { name, tags: mappedTags, customFields: customFieldsData  };
};

const mapItemTagsToArray = (tags: string) => {
  return tags
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v)
    .map((v) => ({ value: v, label: v }));
};

const mapTags = (tags: []) => {
  return tags.map((tag: Tag) => tag.value.trim());
};

export { transformItemCreateData, transformItemEditData, mapItemTagsToArray};
