import AddAdminButton from '../components/AdminPageComponents/AddAdminButton'
import AdminTable from '../components/AdminPageComponents/AdminTable'
import BlockButton from '../components/AdminPageComponents/BlockButton'
import DeleteAdminButton from '../components/AdminPageComponents/DeleteAdminButton'
import DeleteUserButton from '../components/AdminPageComponents/DeleteUserButton'
import UnlockButton from '../components/AdminPageComponents/UnlockButton'
import Pagination from '../components/Common/Pagination'
import { StoreProvider } from '../context/StoreContext'
import { Col, Container, Row } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';

const AdminPage = () => {
  return (
    <StoreProvider>
      <Container>
        <Row className="mb-3">
          <Col>
            <BlockButton />
            <UnlockButton />
            <DeleteUserButton />
            <AddAdminButton />
            <DeleteAdminButton />
          </Col>
        </Row>
        <AdminTable />
        <Pagination />
      </Container>
      <ToastContainer />
    </StoreProvider>
  );
}

export default AdminPage