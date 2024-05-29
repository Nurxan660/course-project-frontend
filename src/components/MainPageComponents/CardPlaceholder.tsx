import { Card, Col, Placeholder } from 'react-bootstrap';

const CardPlaceholder = () => {
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow">
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={8} />
            <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={3} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardPlaceholder