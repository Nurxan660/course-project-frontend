import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ItemListStore from '../../store/ItemListStore';
import { observer } from 'mobx-react-lite';
import DefaultImageLinks from '../../enum/DefaultImageLinks';
import MDEditor from '@uiw/react-md-editor';

const CollectionCard = observer(() => {
  return (
    <Card>
      <Row className="align-items-center">
        <Col xs={12} md={4}>
          <Card.Img
            src={ItemListStore.collection.imageUrl || DefaultImageLinks.DEFAULT_COLLECTION_IMAGE}
            alt="Collection"
          />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Card.Title>{ItemListStore.collection.name}</Card.Title>
            <Card.Text>
              <strong>Category: </strong>{ItemListStore.collection.category}
            </Card.Text>
            <Card.Text>
              <strong>Description: </strong>
              <MDEditor.Markdown source={ItemListStore.collection.description} />
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
})

export default CollectionCard