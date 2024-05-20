import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { AddCollectionFormInput } from "./AddCollectionFormInput";

interface CategoryDecriptionProps {
  register: UseFormRegister<AddCollectionFormInput>;
  errors: FieldErrors<AddCollectionFormInput>;
  watch: UseFormWatch<AddCollectionFormInput>;
  setValue: UseFormSetValue<AddCollectionFormInput>;
}

export type {CategoryDecriptionProps}
