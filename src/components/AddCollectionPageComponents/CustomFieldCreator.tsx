import { Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';
import CustomFieldList from './CustomFieldList';
import CollectionStore from '../../store/CollectionStore';
import { CustomField } from '../../types/CustomField';

const CustomFieldCreator = () => {

    const [name, setName] = useState('');
    const [type, setType] = useState('text')
    const [error, setError] = useState('')

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setType(e.target.value)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }

    const validateFieldName = (fieldName: string): boolean => {
      const isValid = !!fieldName.trim();
      setError(isValid ? '' : "Field name cannot be empty");
      return isValid;
    }
    
    const handleAddButton = () => {
      if (!validateFieldName(name)) return
      const field: CustomField = { name, type };
      CollectionStore.setCustomFields(field);
    }

  return (
    <Container>
      <CustomFieldList />
      <Row>
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              name="name"
              placeholder="Field Name"
              value={name}
              onChange={handleNameChange}
              isInvalid={!!error}
            />
            <Form.Control
              as="select"
              name="type"
              value={type}
              onChange={handleTypeChange}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </Form.Control>
              <Button variant="primary" onClick={handleAddButton}>
                Add Field
              </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomFieldCreator