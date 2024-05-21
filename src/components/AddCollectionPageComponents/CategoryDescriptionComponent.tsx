import { Form, FormGroup} from "react-bootstrap"
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from "react-i18next";
import { CategoryDecriptionProps } from "../../types/collection-types/CollectionDescriptionProps";

const CategoryDescriptionComponent = ({register, errors, watch, setValue}: CategoryDecriptionProps) => {
    const { t } = useTranslation();

    const handleDescriptionChange = (value?: string) => {
      setValue("description", value || "", { shouldValidate: true });
    };

  return (
    <FormGroup className="mb-3">
      <Form.Label>{t("descriptionLabel")}</Form.Label>
      <MDEditor
        value={watch("description")}
        onChange={handleDescriptionChange}
        className={errors.description ? "description-validation" : ""}
      />
      {errors.description && (
        <p className="description-validation-message">
          {errors.description.message}
        </p>
      )}
    </FormGroup>
  );
};

export default CategoryDescriptionComponent;
