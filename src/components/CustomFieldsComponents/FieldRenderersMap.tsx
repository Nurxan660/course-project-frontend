import CustomFieldTypes from "../../enum/CustomFieldTypes";
import { renderField, renderTextAreaField, renderCheckBoxField} from "./FieldRenderers";

const FieldRenderersMap = {
    [CustomFieldTypes.TEXT]: renderField,
    [CustomFieldTypes.NUMBER]: renderField,
    [CustomFieldTypes.DATE]: renderField,
    [CustomFieldTypes.TEXTAREA]: renderTextAreaField,
    [CustomFieldTypes.CHECKBOX]: renderCheckBoxField,
};

export default FieldRenderersMap;