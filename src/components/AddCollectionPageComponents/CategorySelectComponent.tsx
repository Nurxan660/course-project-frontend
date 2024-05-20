import { Form, FormGroup, Col} from "react-bootstrap"
import { capitalizeFirstLetter } from "../../service/collections-service";
import { useTranslation } from "react-i18next";
import { useCollectionCategories } from "../../hooks/useCollectionCategories";
import { CategorySelectProps } from "../../types/CategorySelectProps";

const CategorySelectComponent = ({ register, errors }: CategorySelectProps) => {
  const { t } = useTranslation();
  const categories = useCollectionCategories();

  return (
    <Col>
      <FormGroup className="mb-3">
        <Form.Label>{t("categoryLabel")}</Form.Label>
        <Form.Select isInvalid={!!errors.category} {...register("category")}>
          <option value="" hidden>
            {t("categoryPlaceholder")}
          </option>
          {categories.map((v) => {
            return (
              <option value={v.name}>
                {t(`${capitalizeFirstLetter(v.name)}Category`)}
              </option>
            );
          })}
        </Form.Select>
        {errors.category && (
          <Form.Control.Feedback type="invalid">
            {errors.category.message}
          </Form.Control.Feedback>
        )}
      </FormGroup>
    </Col>
  );
}

export default CategorySelectComponent