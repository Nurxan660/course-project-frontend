import CollectionCard from '../components/CollectionItemsPageComponents/CollectionCard'
import CollectionItemsList from '../components/CollectionItemsPageComponents/CollectionItemsList'
import AddItemsButton from '../components/CollectionItemsPageComponents/AddItemsButton'
import Pagination from '../components/Common/Pagination'
import { StoreProvider } from '../context/StoreContext'

const CollectionItemsPage = () => {
  return (
    <div className="p-2 h-100">
      <StoreProvider>
        <CollectionCard />
        <AddItemsButton />
        <CollectionItemsList />
        <Pagination />
      </StoreProvider>
    </div>
  );
}

export default CollectionItemsPage