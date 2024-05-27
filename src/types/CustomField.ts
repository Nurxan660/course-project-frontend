import CustomFieldTypes from "../enum/CustomFieldTypes";

interface CustomField {
    id?: number;
    name: string;
    type: CustomFieldTypes;
    isRequired: boolean;
    showInTable: boolean;
}
export type {CustomField}