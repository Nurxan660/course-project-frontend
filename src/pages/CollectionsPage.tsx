import React from 'react'
import CollectionsTable from '../components/CollectionsPageComponents/CollectionsTable'
import { Container } from 'react-bootstrap'
import AddCollectionButton from '../components/CollectionsPageComponents/AddCollectionButton'

const CollectionsPage = () => {
  return (
    <Container fluid className='h-100 pt-56'>
      <AddCollectionButton />
      <CollectionsTable />
    </Container>
  );
}

export default CollectionsPage