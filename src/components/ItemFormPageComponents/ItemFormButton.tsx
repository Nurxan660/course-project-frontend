import { observer } from 'mobx-react-lite'
import { Button, Spinner } from 'react-bootstrap'
import { useItemFormStore } from '../../context/ItemFormContext';
import { useTranslation } from 'react-i18next';

const ItemFormButton = observer(() => {
  const store = useItemFormStore();
  const { t } = useTranslation();
  return (
    <>
      {store!== null && store.customFields.length > 0 && (
        <Button variant="primary" type="submit" className="w-100">
          {store.loading ? <Spinner animation="border" /> : store.isEdit ? t("editButton") : t("createButton")}
        </Button>
      )}
    </>
  );
});

export default ItemFormButton