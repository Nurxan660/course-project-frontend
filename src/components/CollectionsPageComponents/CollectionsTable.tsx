import { Table, Spinner } from 'react-bootstrap'
import { getCollections } from '../../api/collection';
import { usePaginationStore } from '../../context/StoreContext';
import { useEffect } from 'react';
import CollectionStore from '../../store/CollectionStore';
import { observer } from 'mobx-react-lite';
import DeleteModalStore from '../../store/DeleteModalStore';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const CollectionsTable = observer(() => {
  const store = usePaginationStore();
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const { t } = useTranslation();

  const loadCollection = async () => {
    CollectionStore.handleLoadCollection(store, notifyError, t);
  }

  useEffect(() => {
    loadCollection()
  }, [store?.page, CollectionStore.isDeleted])

  const handleDeleteCollection = async () => {
    if(!store) return
    CollectionStore.deleteCollection(notifySuccess, notifyError, t, store);
  }

  return (
    <>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {CollectionStore.loading ? (
          <tr>
            <td colSpan={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </td>
          </tr>
        ) : (
          CollectionStore.collections.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.category}</td>
              <td className="center-icons">
                <i className="bi bi-trash cursor-pointer" onClick={() => DeleteModalStore.openModal(handleDeleteCollection, v.id)}></i>
                <i className="bi bi-pencil cursor-pointer ml-10"></i>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
    <ToastContainer />
    </>
  );
})

export default CollectionsTable