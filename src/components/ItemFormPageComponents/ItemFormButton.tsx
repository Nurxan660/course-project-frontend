import { observer } from 'mobx-react-lite'
import { Button, Spinner } from 'react-bootstrap'
import { useItemFormStore } from '../../context/ItemFormContext';
import { useTranslation } from 'react-i18next';
import { ItemFormNavigationProps } from '../../types/props-types/item-props/ItemFormNavigationProps';

const ItemFormButton = observer(({isEdit}: ItemFormNavigationProps) => {
  const store = useItemFormStore();
  const { t } = useTranslation();
  return (
    <>
      {store!== null && store.customFields.length > 0 && (
        <Button variant="primary" type="submit" className="w-100" disabled={store.loading}>
          {store.loading ? <Spinner animation="border" /> : isEdit ? t("editButton") : t("createButton")}
        </Button>
      )}
    </>
  );
});

export default ItemFormButton