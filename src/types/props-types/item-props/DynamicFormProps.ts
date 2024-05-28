import { UseFormRegister, FieldErrors } from "react-hook-form";

interface DynamicFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export type {DynamicFormProps}
