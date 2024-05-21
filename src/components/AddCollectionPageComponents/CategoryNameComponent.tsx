import { Form, FormGroup, Col, FormControl} from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { CategorySelectProps } from "../../types/props-types/CategorySelectProps";

const CategoryNameComponent = ({register, errors}: CategorySelectProps) => {
    const { t } = useTranslation();
  return (
    <Col>
      <FormGroup className="mb-3">
        <Form.Label>{t("nameLabel")}</Form.Label>
        <FormControl
          type="text"
          placeholder={t("collectionNamePlaceholder")}
          isInvalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            {errors.name.message}
          </Form.Control.Feedback>
        )}
      </FormGroup>
    </Col>
  );
};

export default CategoryNameComponent;
