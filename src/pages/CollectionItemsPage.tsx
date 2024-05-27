import CollectionCard from '../components/CollectionItemsPageComponents/CollectionCard'
import CollectionItemsList from '../components/CollectionItemsPageComponents/CollectionItemsList'
import AddItemsButton from '../components/CollectionItemsPageComponents/AddItemsButton'
import Pagination from '../components/Common/Pagination'
import { StoreProvider } from '../context/StoreContext'
import DeleteItemsButton from '../components/CollectionItemsPageComponents/DeleteItemsButton'
import DeleteModal from '../components/Common/DeleteModal'

const CollectionItemsPage = () => {
  return (
    <div className="p-2 h-100">
      <StoreProvider>
        <CollectionCard />
        <AddItemsButton />
        <DeleteItemsButton />
        <CollectionItemsList />
        <Pagination />
        <DeleteModal />
      </StoreProvider>
    </div>
  );
}

export default CollectionItemsPage