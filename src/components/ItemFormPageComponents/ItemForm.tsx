import { Container, Form, Row } from "react-bootstrap"
import FormNameComponent from "./FormNameComponent";
import FormTagsComponent from "./FormTagsComponent";
import { useForm } from "react-hook-form";
import DynamicForm from "./DynamicForm";
import ItemFormButton from "./ItemFormButton";
import { ItemFormProps } from "../../types/props-types/item-props/ItemFormProps";
import { useItemFormStore } from "../../context/ItemFormContext";

const ItemForm = ({ onSubmit }: ItemFormProps) => {
  const {register, handleSubmit, reset, formState: { errors }} = useForm();
  const store = useItemFormStore();

  const onHandleSubmit = async (formData: any) => {
    await onSubmit(formData);
    if(!store?.isEdit) reset(); 
  }

  return (
    <Container className="d-flex w-100 mt-3">
      <Container className="border rounded px-4 py-3 shadow add-collection-form-container">
        <Form onSubmit={handleSubmit(onHandleSubmit)} noValidate>
          <Row>
            <FormNameComponent register={register} errors={errors} />
            <FormTagsComponent register={register} errors={errors} />
            <DynamicForm register={register} errors={errors} />
          </Row>
          <ItemFormButton />
        </Form>
      </Container>
    </Container>
  );
};

export default ItemForm