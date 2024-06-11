import * as yup from "yup";
import { TFunction } from "i18next";
import PriorityTypes from "../../enum/PriorityTypes";

const createHelpFormSchema = (t: TFunction<"translation", undefined>) =>
  yup.object().shape({
    collection: yup.string().optional(),
    description: yup.string().required(t("fieldRequired")),
    priority: yup.string().required(t("fieldRequired")),
});

export {createHelpFormSchema}
