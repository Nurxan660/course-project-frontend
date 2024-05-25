import { useEffect } from "react";
import { Container, Form, Row, Button } from "react-bootstrap"
import { getCollectionCustomFields } from "../../api/custom_field";
import { useParams } from "react-router-dom";
import ItemFormStore from "../../store/ItemFormStore";
import DynamicForm from "./DynamicForm";

const AddItemForm = () => {
  const params = useParams();

  const loadCustomFields = async () => {
    try {
      const res = await getCollectionCustomFields(Number(params.id));
      ItemFormStore.setCustomFields(res.data)
    } catch (e) { }
  }

  useEffect(() => {
    loadCustomFields()
  }, [])
  
  return (
    <Container className="d-flex w-100 mt-3">
      <Container className="border rounded px-4 py-3 shadow add-collection-form-container">
        <DynamicForm />
      </Container>
    </Container>
  );
}

export default AddItemForm