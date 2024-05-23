import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import { AddCollectionFormInput } from "../collection-types/AddCollectionFormInput";

export interface CollectionFormProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  acceptedFiles: File[];
  onSubmit: (formData: AddCollectionFormInput) => void;
  loading: boolean;
  isEdit: boolean;
  defaultValues?: AddCollectionFormInput;
}
