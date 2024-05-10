import { NavDropdown, Nav, Navbar, Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LanguageDropdown from './NavbarComponents/LanguageDropdown';
import { useTranslation } from 'react-i18next';

const NavbarComponent = () => {
  const { t } = useTranslation();

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
              <Link to="/register" className="custom-link">
                {t('registerNavbar')}
              </Link>
            </Nav.Link>
            <Nav.Link>{t('loginNavbar')}</Nav.Link>
            <LanguageDropdown />
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={t('searchPlaceholderNav')}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">{t('searchButtonNav')}</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent