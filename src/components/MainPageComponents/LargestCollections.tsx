import { Card, Container, Row, Col, Button, Placeholder } from 'react-bootstrap';
import { getLargestCollections } from '../../api/collection';
import { useEffect, useState } from 'react';
import { LargestCollections as LargestCollectionType } from '../../types/collection-types/LargestCollections';
import { useTranslation } from 'react-i18next';
import CardPlaceholder from './CardPlaceholder';
import { Link } from 'react-router-dom';

const LargestCollections = () => {
    const [collections, setCollections] = useState<LargestCollectionType[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const loadCollections = async() => {
        try {
            const res = await getLargestCollections();
            setCollections(res.data)
        } catch (e) {  }
        setLoading(false)
    }

    useEffect(() => {
        loadCollections();
    }, [])

    return (
      <Container className="mt-5">
        <h2>{t("largestCollectionHeader")}</h2>
        <Row>
          {loading ? (
            <CardPlaceholder />
          ) : collections.length === 0 ? (
            <h2 className="text-center">Not found</h2>
          ) : (
            collections.map((collection) => (
              <Col key={collection.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow">
                  <Card.Body>
                    <Card.Title>{collection.name}</Card.Title>
                    <Card.Text>
                      {t("numberOfItemsTitle")} {collection.itemCount}
                    </Card.Text>
                    <Link to={`collections/${collection.id}`}>
                      <Button variant="primary">
                        {t("openCollectionButton")}
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    );
}

export default LargestCollections