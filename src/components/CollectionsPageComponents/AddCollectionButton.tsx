import { Button, Row, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AddCollectionButton = () => {
    const { t } = useTranslation();
  return (
    <Row className="mt-3 mb-2">
      <Col className="d-flex justify-content-center">
        <Link to='/collections/add'>
          <Button variant="primary">{t("addCollection")}</Button>
        </Link>
      </Col>
    </Row>
  );
}

export default AddCollectionButton