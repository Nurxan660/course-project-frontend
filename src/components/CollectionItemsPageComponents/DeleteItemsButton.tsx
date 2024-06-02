import { Button, Row, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import ItemListStore from "../../store/ItemListStore";
import { observer } from "mobx-react-lite";
import { ToastContainer, toast } from 'react-toastify';
import DeleteItemStore from "../../store/DeleteItemStore";
import { usePaginationStore } from "../../context/StoreContext";
import DeleteModalStore from "../../store/DeleteModalStore";

const DeleteItemsButton = observer(() => {
  const { t } = useTranslation();
  const { checkedItems } = ItemListStore
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const paginationStore = usePaginationStore();
  
  const handleDeleteItem = async () => {
    if (!paginationStore) return;
    DeleteItemStore.deleteItem(notifySuccess, notifyError, t, paginationStore);
  };

  return (
    <Row className="mt-3 mb-2">
      <Col className="d-flex justify-content-center">
        <Button
          variant="danger"
          disabled={checkedItems.length > 0 ? false : true}
          onClick={() =>
            DeleteModalStore.openModal(handleDeleteItem)
          }
        >
          {t('deleteButton')}
        </Button>
      </Col>
      <ToastContainer />
    </Row>
  );
})

export default DeleteItemsButton