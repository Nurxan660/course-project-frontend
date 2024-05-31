import { Col, Form } from "react-bootstrap"
import { ItemFormComponentsProps } from "../../types/props-types/item-props/ItemFormComponentsProps";
import { useTranslation } from "react-i18next";

const FormNameComponent = ({register, errors}: ItemFormComponentsProps) => {
  const { t } = useTranslation();
  return (
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label>{t('nameLabel')}</Form.Label>
        <Form.Control
          {...register("name", {required: true})}
          type="text"
          placeholder="Enter name"
          isInvalid={!!errors["name"]}
        />
        {errors["name"] && (
          <span className="description-validation-message">This field is required</span>
        )}
      </Form.Group>
    </Col>
  );
}

export default FormNameComponent