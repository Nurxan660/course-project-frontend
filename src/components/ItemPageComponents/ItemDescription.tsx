import {Card, Spinner} from "react-bootstrap";
import { getItemWithLikes } from "../../api/item";
import { useParams } from "react-router-dom";
import ItemStore from "../../store/ItemStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ItemLikeButton from "./ItemLikeButton";
import CustomFieldTypes from "../../enum/CustomFieldTypes";
import { convertBooleanFieldType } from "../../service/utils/booleanUtils";
import { useTranslation } from "react-i18next";

const ItemDescription = observer(() => {
    const params = useParams();
    const { t } = useTranslation();

    const loadItem = async () => {
        try {
            const res = await getItemWithLikes(Number(params.itemId));
            ItemStore.setItem(res.data);
            ItemStore.setLiked(res.data.liked);
        } catch (e) {  }
        ItemStore.setLoading(false);
    }

    useEffect(() => {
        loadItem()
    }, [])
  return (
    <Card>
      <Card.Header as="h5">{ItemStore.item.name}</Card.Header>
      {ItemStore.loading ? (
        <Card.Body
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50%" }}
        >
          <Spinner />
        </Card.Body>
      ) : (
        <Card.Body>
          {ItemStore.item.customFields.length === 0 ? (
            <h2>{t('noDescriptionLabel')}</h2>
          ) : (
            ItemStore.item.customFields.map((field, index) => (
              <p key={index}>
                <strong>{field.customFieldName}: </strong>
                {field.type === CustomFieldTypes.CHECKBOX
                  ? convertBooleanFieldType(field.value)
                  : field.value}
              </p>
            ))
          )}
          <ItemLikeButton />
        </Card.Body>
      )}
    </Card>
  );
})

export default ItemDescription