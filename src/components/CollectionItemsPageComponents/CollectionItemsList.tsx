import Table from 'react-bootstrap/Table';
import { getItemList } from '../../api/item';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ItemListStore from '../../store/ItemListStore';
import { usePaginationStore } from '../../context/StoreContext';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import DeleteItemStore from '../../store/DeleteItemStore';
import { Link } from 'react-router-dom';
import { getCollectionBasic } from '../../api/collection';
import { getTokens } from '../../service/utils/tokenUtils';
import TableHeaders from './TableHeaders';
import TableSpinner from '../Common/TableSpinner';
import NotFoundComponent from '../Common/NotFoundComponent';

const CollectionItemsList = observer(() => {
  const params = useParams();
  const store = usePaginationStore();
  const currentUser = getTokens();

  const loadItems = async () => {
    ItemListStore.setLoading(true);
    try {
      const itemList = await getItemList(Number(params.id), store?.page || 1)
      const collection = await getCollectionBasic(Number(params.id))
      ItemListStore.setItems(itemList.data);
      ItemListStore.setCollection(collection.data)
      store?.setTotalPages(itemList.data.totalPages)
    } catch (e) {  }
    ItemListStore.setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, [store?.page, DeleteItemStore.isDeleted])

  return (
    <div className="mt-4">
      <Table striped bordered hover size="sm">
        <TableHeaders />
        <tbody>
          {ItemListStore.loading ? (
            <TableSpinner
              colspan={3 + ItemListStore.items.customFieldNames.length}
            />
          ) : (
            ItemListStore.items.items.map((v, index) => {
              return (
                <tr key={v.itemId}>
                  {currentUser && (
                    <td className="text-center align-middle">
                      <Form.Check
                        checked={ItemListStore.checkedItems.includes(v.itemId)}
                        onChange={() =>
                          ItemListStore.handleCheckChange(v.itemId)
                        }
                      />
                    </td>
                  )}
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/collections/${params.id}/item/${v.itemId}`}>
                      {v.itemName}
                    </Link>
                  </td>
                  {v.customFieldValues.map((v, index) => {
                    return <td key={index}>{v}</td>;
                  })}
                  {Array.from({
                    length:
                      ItemListStore?.items.customFieldNames.length -
                      v.customFieldValues.length,
                  }).map((_, index) => (
                    <td key={`placeholder-${index}`}></td>
                  ))}
                  {currentUser && (
                    <td className="center-icons">
                      <Link
                        to={`/collections/${params.id}/edit-item/${v.itemId}`}
                        style={{ color: "black" }}
                      >
                        <i className="bi bi-pencil cursor-pointer ml-10"></i>
                      </Link>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      {ItemListStore.items.items.length === 0 && !ItemListStore.loading && (
        <NotFoundComponent />
      )}
    </div>
  );
})

export default CollectionItemsList