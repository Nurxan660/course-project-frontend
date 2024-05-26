import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FieldValues } from "react-hook-form";

interface DynamicFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export type {DynamicFormProps}
