import CollectionsTable from '../components/CollectionsPageComponents/CollectionsTable'
import { Container, Row, Col } from 'react-bootstrap'
import AddCollectionButton from '../components/CollectionsPageComponents/AddCollectionButton'
import Pagination from '../components/Common/Pagination'
import { StoreProvider } from '../context/StoreContext'
import DeleteModal from '../components/Common/DeleteModal'
import DeleteCollectionButton from '../components/CollectionsPageComponents/DeleteCollectionButton'

const CollectionsPage = () => {
  return (
    <Container fluid className="h-100">
      <StoreProvider>
        <Row className="mb-3">
          <Col>
            <AddCollectionButton />
            <DeleteCollectionButton />
          </Col>
        </Row>
        <CollectionsTable />
        <Pagination />
        <DeleteModal />
      </StoreProvider>
    </Container>
  );
}

export default CollectionsPage