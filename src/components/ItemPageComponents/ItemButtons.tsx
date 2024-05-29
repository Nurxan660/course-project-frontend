import { Col, Card, Button } from "react-bootstrap"

const ItemButtons = () => {
  return (
    <Col md={4}>
      <Card>
        <Card.Body>
          <Button variant="warning">Редактировать</Button>
          <Button variant="danger" className="ml-10">
            Удалить
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ItemButtons