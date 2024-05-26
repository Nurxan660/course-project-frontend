import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ItemFormComponentsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export type {ItemFormComponentsProps}
