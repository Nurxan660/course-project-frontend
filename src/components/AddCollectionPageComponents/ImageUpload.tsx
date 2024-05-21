import { Form, FormGroup } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { ImageUploadProps } from "../../types/props-types/ImageUploadProps";

const ImageUpload = ({ getRootProps, getInputProps, acceptedFiles }: ImageUploadProps) => {
    const { t } = useTranslation();

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
          {file.name}
        </li>
      ));

  return (
    <FormGroup className="mb-3">
      <Form.Label>{t("imageLabel")}</Form.Label>
      <div {...getRootProps()} className="image-dropdown">
        <input {...getInputProps()} />
        <p>{t("fileDropdownLabel")}</p>
      </div>
      <aside>
        <ul className="break-word">{files}</ul>
      </aside>
    </FormGroup>
  );
};

export default ImageUpload;
