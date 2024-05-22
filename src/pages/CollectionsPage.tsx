import CollectionsTable from '../components/CollectionsPageComponents/CollectionsTable'
import { Container } from 'react-bootstrap'
import AddCollectionButton from '../components/CollectionsPageComponents/AddCollectionButton'
import Pagination from '../components/Common/Pagination'
import { StoreProvider } from '../context/StoreContext'
import DeleteModal from '../components/Common/DeleteModal'

const CollectionsPage = () => {
  return (
    <Container fluid>
      <StoreProvider>
        <AddCollectionButton />
        <CollectionsTable />
        <Pagination />
        <DeleteModal />
      </StoreProvider>
    </Container>
  );
}

export default CollectionsPage