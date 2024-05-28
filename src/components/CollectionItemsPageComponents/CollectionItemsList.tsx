import Table from 'react-bootstrap/Table';
import { getItemList } from '../../api/item';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ItemListStore from '../../store/ItemListStore';
import { usePaginationStore } from '../../context/StoreContext';
import { observer } from 'mobx-react-lite';
import { Spinner, Form } from 'react-bootstrap';
import DeleteItemStore from '../../store/DeleteItemStore';
import { Link } from 'react-router-dom';
import { getCollectionBasic } from '../../api/collection';

const CollectionItemsList = observer(() => {
  const params = useParams();
  const store = usePaginationStore();

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
        <thead>
          <tr className="text-center align-middle">
          <th>
              <Form.Check
                onClick={() => ItemListStore.handleCheckAll()}
              />
            </th>
            <th>№</th>
            <th>Name</th>
            {ItemListStore.items.customFieldNames.map((v) => {
              return <th key={v}>{v}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {ItemListStore.loading ? (
            <tr>
              <td colSpan={3 + ItemListStore.items.customFieldNames.length}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "60vh" }}
                >
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </td>
            </tr>
          ) : (
            ItemListStore.items.items.map((v, index) => {
              return (
                <tr key={v.itemId}>
                  <td className="text-center align-middle">
                    <Form.Check
                      checked={ItemListStore.checkedItems.includes(v.itemId)}
                      onChange={() => ItemListStore.handleCheckChange(v.itemId)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{v.itemName}</td>
                  {v.customFieldValues.map((v, index) => {
                    return <td key={index}>{v}</td>;
                  })}
                  <td className="center-icons">
                    <Link
                      to={`/collections/${params.id}/edit-item/${v.itemId}`}
                      style={{ color: "black" }}
                    >
                      <i className="bi bi-pencil cursor-pointer ml-10"></i>
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
})

export default CollectionItemsList