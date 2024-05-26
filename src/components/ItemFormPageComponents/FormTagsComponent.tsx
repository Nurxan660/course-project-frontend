import { Col, Form } from "react-bootstrap"
import { ItemFormComponentsProps } from "../../types/props-types/item-props/ItemFormComponentsProps";

const FormTagsComponent = ({ register, errors }: ItemFormComponentsProps) => {
  return (
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          {...register("tags", {required: true})}
          type="text"
          placeholder="Enter tags"
          isInvalid={!!errors["tags"]}
        />
        {errors["tags"] && (
          <span className="invalid-feedback">This field is required</span>
        )}
      </Form.Group>
    </Col>
  );
};

export default FormTagsComponent