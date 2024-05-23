import { Button, Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import CustomFieldList from "./CustomFieldList";
import { CustomField } from "../../types/CustomField";
import { useTranslation } from "react-i18next";
import CustomFieldTypes from "../../enum/CustomFieldTypes";
import { useCollectionFormStore } from "../../context/CollectionFormContext";

const CustomFieldCreator = () => {
  const store = useCollectionFormStore();
  const [name, setName] = useState("");
  const [type, setType] = useState("text");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const validateFieldName = (fieldName: string): boolean => {
    const isValid = !!fieldName.trim();
    setError(isValid ? "" : t("fieldRequired"));
    return isValid;
  };

  const handleAddButton = () => {
    if (!validateFieldName(name)) return;
    const field: CustomField = { name, type };
    store?.setCustomFields(field);
  };

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
              {Object.entries(CustomFieldTypes).map(([key, value]) => (
                <option key={key.toLowerCase()} value={key.toLowerCase()}>
                  {value}
                </option>
              ))}
            </Form.Control>
            <Button variant="primary" onClick={handleAddButton}>
              Add Field
            </Button>
            {error && (
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomFieldCreator;
