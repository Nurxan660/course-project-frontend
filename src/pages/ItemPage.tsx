import {Container, Row, Col} from "react-bootstrap";
import ItemDescription from "../components/ItemPageComponents/ItemDescription";
import { ToastContainer } from 'react-toastify';
import { getTokens } from "../service/utils/authUtils";
import BreadcumbNavigation from "../components/Common/BreadcrumbNavigation";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const params = useParams();

  return (
    <Container className="pt-3 h-100">
      <BreadcumbNavigation
        linkToPage={`/collections/${params.id}`}
        firstLink="collectionsNavigationName"
        currentLink="itemNavigationName"
      />
      <Row>
        <Col md={8}>
          <ItemDescription />
        </Col>
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default ItemPage;
