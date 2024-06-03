import CollectionCard from '../components/CollectionItemsPageComponents/CollectionCard'
import CollectionItemsList from '../components/CollectionItemsPageComponents/CollectionItemsList'
import AddItemsButton from '../components/CollectionItemsPageComponents/AddItemsButton'
import Pagination from '../components/Common/Pagination'
import { StoreProvider } from '../context/StoreContext'
import DeleteItemsButton from '../components/CollectionItemsPageComponents/DeleteItemsButton'
import DeleteModal from '../components/Common/DeleteModal'
import { getTokens } from '../service/utils/authUtils'
import BreadcumbNavigation from '../components/Common/BreadcrumbNavigation'

const CollectionItemsPage = () => {
  const currentUser = getTokens();

  return (
    <div className="p-2 h-100">
      <StoreProvider>
        <BreadcumbNavigation
          linkToPage={currentUser ? "/collections" : "/"}
          firstLink={currentUser ? "collectionsNavigationName" : "homeNavigationName"}
          currentLink="itemsNavigationName"
        />
        <CollectionCard />
        {currentUser && (
          <>
            <AddItemsButton />
            <DeleteItemsButton />
          </>
        )}
        <CollectionItemsList />
        <Pagination />
        <DeleteModal />
      </StoreProvider>
    </div>
  );
}

export default CollectionItemsPage