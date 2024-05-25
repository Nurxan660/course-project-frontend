import * as yup from "yup";
import { TFunction } from "i18next";
import CustomFieldTypes from "../../enum/CustomFieldTypes";

const customFieldValidation = (t: TFunction<"translation", undefined>) =>
  yup.object().shape({
    name: yup.string().required(t("fieldRequired")),
    type: yup.mixed<CustomFieldTypes>().required("fieldRequired"),
    isRequired: yup.boolean().required(t("fieldRequired")),
});

export {customFieldValidation}
