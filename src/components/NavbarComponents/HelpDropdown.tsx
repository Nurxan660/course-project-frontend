import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HelpDropdown = () => {
  const { t } = useTranslation();

  return (
    <NavDropdown title={t('helpNavigationName')} align="end">
      <NavDropdown.Item href="/help">{t('createTicketLabel')}</NavDropdown.Item>
      <NavDropdown.Item href="/tickets">{t('allTicketsLabel')}</NavDropdown.Item>
    </NavDropdown>
  );
};

export default HelpDropdown