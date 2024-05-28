import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useItemFormStore } from '../../context/ItemFormContext';
import { useParams } from 'react-router-dom';
import { ItemFormNavigationProps } from '../../types/props-types/item-props/ItemFormNavigationProps';

const ItemFormNavigation = ({isEdit}: ItemFormNavigationProps) => {
  const { t } = useTranslation();
  const store = useItemFormStore();
  const params = useParams();

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/collections/${params.id}` }}>
        {t('itemsNavigationName')}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{isEdit ? t('editItemNavigationName') : t('addItemNavigationName')}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default ItemFormNavigation