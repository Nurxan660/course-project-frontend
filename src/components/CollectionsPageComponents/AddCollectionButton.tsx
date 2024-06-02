import { Button, Row, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AddCollectionButton = () => {
    const { t } = useTranslation();
  return (
    <Link to="/collections/add">
      <Button variant="primary mt-5">{t("addCollection")}</Button>
    </Link>
  );
}

export default AddCollectionButton