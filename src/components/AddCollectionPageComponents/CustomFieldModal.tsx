import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useCollectionFormStore } from '../../context/CollectionFormContext';
import { observer } from 'mobx-react-lite';
import { useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { customFieldValidation } from '../../service/validations/customFieldValidation';
import { useTranslation } from 'react-i18next';
import { CustomField } from '../../types/CustomField';
import CustomFieldTypes from '../../enum/CustomFieldTypes';

const CustomFieldModal = observer(() => {
  const store = useCollectionFormStore();
  const { t } = useTranslation();

  const { register, handleSubmit, reset , formState: { errors }} = useForm<CustomField>({
    resolver: yupResolver(customFieldValidation(t)),
  });

  const onSubmit = (formData: CustomField) => {
    store?.setCustomFields(formData);
    reset();
    store?.setIsCustomFieldModalOpen(false);
  }

  return (
    <Modal show={store?.isCustomFieldModalOpen}>
      <Modal.Header>
        <Modal.Title>Add custom field</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Field Name"
              isInvalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
          <Form.Control.Feedback type="invalid">
            {errors.name.message}
          </Form.Control.Feedback>
        )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              isInvalid={!!errors.type}
              {...register("type")}
            >
              {Object.entries(CustomFieldTypes).map(([key, value]) => (
                <option key={key.toLowerCase()} value={key.toLowerCase()}>
                  {value}
                </option>
              ))}
            </Form.Control>
            {errors.name && (
          <Form.Control.Feedback type="invalid">
            {errors.name.message}
          </Form.Control.Feedback>
        )}
          </Form.Group>
          <Form.Check label="Required" {...register("isRequired")}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => store?.setIsCustomFieldModalOpen(false)}>Close</Button>
        <Button variant="primary" type='submit'>Add</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
})

export default CustomFieldModal