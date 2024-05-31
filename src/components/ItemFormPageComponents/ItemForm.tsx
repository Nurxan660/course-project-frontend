import { Container, Form, Row } from "react-bootstrap"
import FormNameComponent from "./FormNameComponent";
import FormTagsComponent from "./FormTagsComponent";
import { useForm } from "react-hook-form";
import DynamicForm from "./DynamicForm";
import ItemFormButton from "./ItemFormButton";
import { ItemFormProps } from "../../types/props-types/item-props/ItemFormProps";
import { useEffect } from "react";
import { useItemFormStore } from "../../context/ItemFormContext";
import { observer } from "mobx-react-lite";

const ItemForm = observer(({ onSubmit, isEdit }: ItemFormProps) => {
  const {register, handleSubmit, reset, formState: { errors }} = useForm();
  const store = useItemFormStore();

  const onHandleSubmit = async (formData: any) => {
    await onSubmit(formData);
  }

  useEffect(() => {
    if (store?.defaultValues) {
      reset(store.defaultValues);
    }
  }, [store?.defaultValues]);

  return (
    <Container className="d-flex w-100 mt-3">
      <Container className="border rounded px-4 py-3 shadow add-collection-form-container">
        <Form onSubmit={handleSubmit(onHandleSubmit)} noValidate>
          <Row>
            <FormNameComponent register={register} errors={errors} />
            <FormTagsComponent/>
            <DynamicForm register={register} errors={errors} />
          </Row>
          <ItemFormButton isEdit={isEdit}/>
        </Form>
      </Container>
    </Container>
  );
});

export default ItemForm