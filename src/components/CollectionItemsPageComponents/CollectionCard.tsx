import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ItemListStore from '../../store/ItemListStore';
import { observer } from 'mobx-react-lite';
import DefaultImageLinks from '../../enum/DefaultImageLinks';
import MDEditor from '@uiw/react-md-editor';
import { useTranslation } from 'react-i18next';

const CollectionCard = observer(() => {
  const { t } = useTranslation();
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
              <strong>{t('categoryLabel')}: </strong>{ItemListStore.collection.category}
            </Card.Text>
            <Card.Text>
              <strong>{t('descriptionLabel')}: </strong>
              <MDEditor.Markdown source={ItemListStore.collection.description} />
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
})

export default CollectionCard