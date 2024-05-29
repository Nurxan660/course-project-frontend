import {Container, Row, Col,Button, Card,Form,ListGroup} from "react-bootstrap";
import ItemDescription from "../components/ItemPageComponents/ItemDescription";
import ItemButtons from "../components/ItemPageComponents/ItemButtons";
import { ToastContainer } from 'react-toastify';

const ItemPage = () => {
  

  return (
    <Container className="mt-3 h-100">
      <Row>
        <Col md={8}>
          <ItemDescription />
        </Col>
        <ItemButtons />
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default ItemPage;
