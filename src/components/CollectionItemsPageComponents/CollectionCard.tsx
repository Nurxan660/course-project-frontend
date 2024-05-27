import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ItemListStore from '../../store/ItemListStore';
import { observer } from 'mobx-react-lite';
import DefaultImageLinks from '../../enum/DefaultImageLinks';

const CollectionCard = observer(() => {
  return (
    <Card>
      <Row className="align-items-center">
        <Col xs={12} md={4}>
          <Card.Img
            src={ItemListStore.items.imageUrl || DefaultImageLinks.DEFAULT_COLLECTION_IMAGE}
            alt="Collection"
          />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Card.Title>{ItemListStore.items.name}</Card.Title>
            <Card.Text>
              <strong>Category: </strong>{ItemListStore.items.categoryName}
            </Card.Text>
            <Card.Text>
              <strong>Description: </strong>
              {ItemListStore.items.description}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
})

export default CollectionCard