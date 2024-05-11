import { Nav, Navbar, Form, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LanguageDropdown from './NavbarComponents/LanguageDropdown';
import { useTranslation } from 'react-i18next';
import { getTokens, removeTokens } from '../service/token-service';
import { logout } from '../api/auth';

const NavbarComponent = () => {
  const { t } = useTranslation();
  const currentTokens = getTokens();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(currentTokens.refreshToken);
      removeTokens();
      navigate("/", { replace: true });
    } catch (e) { console.log(e) }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="custom-link">
            MyCollections
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              {!currentTokens && (
                <Link to="/register" className="custom-link">
                  {t("registerNavbar")}
                </Link>
              )}
            </Nav.Link>
            {!currentTokens && (
              <Nav.Link>
                <Link to="/login" className="custom-link">
                  {t("loginNavbar")}
                </Link>
              </Nav.Link>
            )}
            <LanguageDropdown />
            {currentTokens && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={t("searchPlaceholderNav")}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">{t("searchButtonNav")}</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent