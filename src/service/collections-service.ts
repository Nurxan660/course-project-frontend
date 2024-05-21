import { AddCollectionFormInput } from "../types/collection-types/AddCollectionFormInput";
import { CustomField } from "../types/CustomField";

const capitalizeFirstLetter = (category: string) => {
  if (!category) return category;
  return category.charAt(0).toLowerCase() + category.slice(1);
};

const getFullData = (formData: AddCollectionFormInput, imageUrl: string, customFields: CustomField[]) => {
  return {
    ...formData,
    imageUrl: imageUrl,
    customFields: customFields,
  };
};

export {capitalizeFirstLetter, getFullData}
