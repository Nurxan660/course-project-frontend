import React from "react";
import ItemFormStore from "../../store/ItemFormStore";
import { Col, Placeholder, Form } from "react-bootstrap";
import { useItemFormStore } from "../../context/ItemFormContext";
import { observer } from "mobx-react-lite";

const DynamicFormPlaceholder = observer(() => {
  const store = useItemFormStore();
  return (
    <>
      {store?.loadingCustomFields  && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Col xs={12} key={index}>
              <Form.Group className="mb-3">
                <Placeholder as={Form.Label} xs={1}>
                  <Placeholder xs={1} animation="glow" />
                </Placeholder>
                <Placeholder as={Form.Control} animation="glow" xs={12} />
              </Form.Group>
            </Col>
          ))}
          <Col>
            <Placeholder.Button variant="primary" xs={12} />
          </Col>
        </>
      )}
    </>
  );
});

export default DynamicFormPlaceholder;
