import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";

interface ImageUploadProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  acceptedFiles: File[];
}

export type {ImageUploadProps}
