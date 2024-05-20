import * as yup from "yup";
import { TFunction } from "i18next";

const createCollectionSchema = (t: TFunction<"translation", undefined>) =>
  yup.object().shape({
    name: yup.string().required(t("fieldRequired")),
    category: yup.string().required(t("fieldRequired")),
    description: yup.string().required(t("fieldRequired")),
});

export {createCollectionSchema}
