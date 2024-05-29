import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getLastAddedItems } from "../../api/item";
import { useEffect, useState } from "react";
import { LastAddedItemsResponse } from "../../types/item-types/LastAddedItemsResponse";
import CardPlaceholder from "./CardPlaceholder";
import { Link } from "react-router-dom";

const RecentItems = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<LastAddedItemsResponse[]>([])
  const [loading, setLoading] = useState(true);

  const loadLastAddedItems = async () => {
    try {
      const res = await getLastAddedItems();
      setItems(res.data)
    } catch (e) {  }
    setLoading(false);
  }

  useEffect(() => {
    loadLastAddedItems();
  }, [])

  return (
    <Container>
      <h2>{t("lastAddedItemsLabel")}</h2>
      <Row>
        {loading ? (
          <CardPlaceholder />
        ) : items.length === 0 ? (
          <h2 className="text-center">Not found</h2>
        ) : (
          items.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Body>
                  <Card.Title>{item.itemName}</Card.Title>
                  <Card.Text>
                    {t("collectionLabel")}: {item.collectionName}
                    <br />
                    {t("authorLabel")}: {item.fullName}
                  </Card.Text>
                  <Link to={`collections/${item.collectionId}/item/${item.id}`}>
                  <Button variant="primary">{t("openItemButton")}</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default RecentItems;
