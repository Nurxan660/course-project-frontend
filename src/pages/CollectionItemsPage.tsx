import React from 'react'
import CollectionCard from '../components/CollectionItemsPageComponents/CollectionCard'
import CollectionItemsList from '../components/CollectionItemsPageComponents/CollectionItemsList'
import AddItemsButton from '../components/CollectionItemsPageComponents/AddItemsButton'

const CollectionItemsPage = () => {
  return (
    <div className='p-2 h-100'>
      <CollectionCard />
      <AddItemsButton />
      <CollectionItemsList />
    </div>
  );
}

export default CollectionItemsPage