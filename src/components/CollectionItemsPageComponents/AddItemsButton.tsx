import { Button, Row, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddItemsButton = () => {
    const { t } = useTranslation();
    const params = useParams();
  return (
    <Row className="mt-3 mb-2">
      <Col className="d-flex justify-content-center">
        <Link to={`/collections/${params.id}/add-item`}>
          <Button variant="primary">{t("addItemButton")}</Button>
        </Link>
      </Col>
    </Row>
  )
}

export default AddItemsButton