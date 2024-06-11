import { Nav, Navbar, Form, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LanguageDropdown from './NavbarComponents/LanguageDropdown';
import { useTranslation } from 'react-i18next';
import { getTokens, removeTokens } from '../service/utils/authUtils';
import { logout } from '../api/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LiveSearch from './LiveSearchComponents/LiveSearch';
import HelpDropdown from './NavbarComponents/HelpDropdown';

const NavbarComponent = () => {
  const { t } = useTranslation();
  const user = getTokens();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(user.refreshToken);
      removeTokens();
      navigate("/", { replace: true });
    } catch (e) { console.log(e) }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
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
            {user && (
              <Nav.Item className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-3"></i>
                <span className="ml-5">{user?.fullName}</span>
              </Nav.Item>
            )}
            <Nav.Link className="ml-5">
              {!user && (
                <Link to="/register" className="custom-link">
                  {t("registerNavbar")}
                </Link>
              )}
            </Nav.Link>
            {!user && (
              <Nav.Link>
                <Link to="/login" className="custom-link">
                  {t("loginNavbar")}
                </Link>
              </Nav.Link>
            )}
            <LanguageDropdown />
            {user && (
              <Nav.Link onClick={handleLogout}>{t("logoutButton")}</Nav.Link>
            )}

            <LiveSearch />
          </Nav>
            <HelpDropdown />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent