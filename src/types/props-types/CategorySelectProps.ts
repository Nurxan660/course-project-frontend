import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AddCollectionFormInput } from "../collection-types/AddCollectionFormInput";

interface CategorySelectProps {
  register: UseFormRegister<AddCollectionFormInput>;
  errors: FieldErrors<AddCollectionFormInput>;
}

export type {CategorySelectProps}
