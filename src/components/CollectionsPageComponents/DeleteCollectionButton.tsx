import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { usePaginationStore } from "../../context/StoreContext";
import DeleteCollectionStore from "../../store/DeleteCollectionStore";
import { toast } from 'react-toastify';
import DeleteModalStore from "../../store/DeleteModalStore";

const DeleteCollectionButton = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const { t } = useTranslation();
  const paginationStore = usePaginationStore();

  const handleDeleteCollection = async () => {
    if (!paginationStore) return;
    await DeleteCollectionStore.deleteCollection(notifySuccess, notifyError, t, paginationStore);
    DeleteCollectionStore.setCheckedItems([]);
  };

  return (
    <Button
      variant="danger ml-10 mt-5"
      onClick={() => DeleteModalStore.openModal(handleDeleteCollection)}
    >
      Delete
    </Button>
  );
};

export default DeleteCollectionButton