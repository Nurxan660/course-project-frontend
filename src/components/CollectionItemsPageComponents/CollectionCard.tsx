import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

const CollectionCard = () => {
  return (
    <Card>
      <Row className="align-items-center">
        <Col xs={12} md={4}>
          <Card.Img
            src="https://ienglish.ru/assets/uploads/images/blog/interesno_ob_angliiskom/kak-viuchit-angliiskiy-bistro/Knigi_na_anglizkom_dlia_urovnia_intermediate_2.jpg"
            alt="Collection"
          />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Card.Title>Books</Card.Title>
            <Card.Text>
              <strong>Category: </strong>Books
            </Card.Text>
            <Card.Text>
              <strong>Description: </strong>Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Esse consequatur, tempore illo eum
              similique ipsa voluptas ipsam quae consectetur dolorem distinctio,
              at reprehenderit expedita? Amet quas fugiat sit corrupti facilis!
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default CollectionCard