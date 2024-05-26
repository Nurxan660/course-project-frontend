import { Col, Form } from "react-bootstrap"
import { ItemFormComponentsProps } from "../../types/props-types/item-props/ItemFormComponentsProps";

const FormNameComponent = ({register, errors}: ItemFormComponentsProps) => {
  return (
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          {...register("name", {required: true})}
          type="text"
          placeholder="Enter name"
          isInvalid={!!errors["name"]}
        />
        {errors["name"] && (
          <span className="invalid-feedback">This field is required</span>
        )}
      </Form.Group>
    </Col>
  );
}

export default FormNameComponent