import { Form, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import ItemFormStore from "../../store/ItemFormStore";
import FieldRenderersMap from "../CustomFieldsComponents/FieldRenderersMap";
import DynamicFormPlaceholder from "./DynamicFormPlaceholder";
import { DynamicFormProps } from "../../types/props-types/item-props/DynamicFormProps";
import { useItemFormStore } from "../../context/ItemFormContext";

const DynamicForm = observer(({register, errors}: DynamicFormProps) => {
  const store = useItemFormStore();
  return (
    <>
      {store?.customFields.map((field) => {
        return (
          <Col md={12} key={field.name}>
            <Form.Group className="mb-3">
              {FieldRenderersMap[field.type](field, register, errors)}
              {errors[field.name] && (
                <span className="invalid-feedback">This field is required</span>
              )}
            </Form.Group>
          </Col>
        );
      })}
      <DynamicFormPlaceholder />
    </>
  );
});

export default DynamicForm;
