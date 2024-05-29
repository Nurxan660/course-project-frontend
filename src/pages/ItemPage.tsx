import {Container, Row, Col,Button, Card,Form,ListGroup} from "react-bootstrap";
import ItemDescription from "../components/ItemPageComponents/ItemDescription";
import ItemButtons from "../components/ItemPageComponents/ItemButtons";
import { ToastContainer } from 'react-toastify';
import { getTokens } from "../service/utils/tokenUtils";
const ItemPage = () => {
  const currentUser = getTokens();

  return (
    <Container className="mt-3 h-100">
      <Row>
        <Col md={8}>
          <ItemDescription />
        </Col>
        { currentUser && <ItemButtons /> }
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default ItemPage;
