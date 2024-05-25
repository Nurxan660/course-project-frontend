import CustomFieldTypes from "../enum/CustomFieldTypes";

interface CustomField {
    id?: number;
    name: string;
    type: CustomFieldTypes;
    isRequired: boolean;
}
export type {CustomField}