import { useForm } from "react-hook-form";
import {Form, Row, Col} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import ItemFormStore from "../../store/ItemFormStore";
import { Button} from "react-bootstrap";
import FieldRenderersMap from "../CustomFieldsComponents/FieldRenderersMap";
import DynamicFormPlaceholder from "./DynamicFormPlaceholder";

const DynamicForm = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...register("name")}
              type="text"
              placeholder="Enter name"
              isInvalid={!!errors["name"]}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              {...register("tags")}
              type="text"
              placeholder="Enter tags"
              isInvalid={!!errors["tags"]}
            />
          </Form.Group>
        </Col>
        {ItemFormStore.customFields.map((field, index) => {
          return (
            <Col md={12} key={field.name}>
              <Form.Group className="mb-3">
                {FieldRenderersMap[field.type](field, register, errors)}
                {errors[field.name] && (
                  <span className="invalid-feedback">
                    This field is required
                  </span>
                )}
              </Form.Group>
            </Col>
          );
        })}
        <DynamicFormPlaceholder />
      </Row>
      {ItemFormStore.customFields.length > 0 && (
        <Button variant="primary" type="submit" className="w-100">
          Create
        </Button>
      )}
    </Form>
  );
});

export default DynamicForm;
