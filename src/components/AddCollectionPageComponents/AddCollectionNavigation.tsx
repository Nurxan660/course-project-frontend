import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import { CollectionNavigationProps } from '../../types/props-types/CollectionNavigationProps';
import { useTranslation } from 'react-i18next';

const AddCollectionNavigation = ({isEdit}: CollectionNavigationProps) => {
  const { t } = useTranslation();
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/collections" }}>
        {t('collectionsNavigationName')}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{isEdit ? t('editCollectionNavigationName') : t('addCollectionNavigationName')}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default AddCollectionNavigation