import { useTranslation } from "react-i18next";

const NotFoundComponent = () => {
    const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center align-items-center h-50">
      <h2>{t('notFoundLabel')}</h2>
    </div>
  );
}

export default NotFoundComponent