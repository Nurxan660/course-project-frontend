import { Table, Form } from 'react-bootstrap'
import { usePaginationStore } from '../../context/StoreContext';
import { useEffect } from 'react';
import CollectionStore from '../../store/DeleteCollectionStore';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NotFoundComponent from '../Common/NotFoundComponent';
import TableSpinner from '../Common/TableSpinner';

const CollectionsTable = observer(() => {
  const store = usePaginationStore();
  const notifyError = (message: string) => toast.error(message);
  const { t } = useTranslation();

  const loadCollection = async () => {
    CollectionStore.handleLoadCollection(store, notifyError, t);
  }

  useEffect(() => {
    loadCollection()
  }, [store?.page, CollectionStore.isDeleted])

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center align-middle">
            <th>
              <Form.Check
                onClick={() => CollectionStore.handleCheckAll()}
                checked={CollectionStore.areAllCollectionsChecked()}
              />
            </th>
            <th>{t("nameLabel")}</th>
            <th>{t("categoryLabel")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {CollectionStore.loading ? (
            <TableSpinner colspan={4} />
          ) : (
            CollectionStore.collections.map((v) => (
              <tr key={v.id}>
                <td className="text-center align-middle">
                  <Form.Check
                    checked={CollectionStore.checkedItems.includes(v.id)}
                    onChange={() => CollectionStore.handleCheckChange(v.id)}
                  />
                </td>
                <td className="cursor-pointer">
                  <Link to={`/collections/${v.id}`} className="color-black">
                    <span>{v.name}</span>
                  </Link>
                </td>
                <td>{v.category}</td>
                <td className="center-icons">
                  <Link
                    to={`/collections/edit/${v.id}`}
                    style={{ color: "black" }}
                  >
                    <i className="bi bi-pencil cursor-pointer ml-10"></i>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {CollectionStore.collections.length === 0 && !CollectionStore.loading && (
        <NotFoundComponent />
      )}
      <ToastContainer />
    </>
  );
})

export default CollectionsTable