import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BreadcumbNavigationProps } from '../../types/props-types/BreadcumbNavigationProps';

const BreadcumbNavigation = ({linkToPage, firstLink, currentLink}: BreadcumbNavigationProps) => {
  const { t } = useTranslation();

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: `${linkToPage}` }}>
        {t(`${firstLink}`)}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{t(`${currentLink}`)}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcumbNavigation