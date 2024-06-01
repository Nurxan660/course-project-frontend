import { Button } from "react-bootstrap"
import AdminStore from '../../store/AdminStore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const DeleteUserButton = observer(() => {
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const onDeleteUser = async () => {
    setLoading(true);
    await AdminStore.handleDeleteUser(notifySuccess);
    setLoading(false);
  };

  return (
    <Button
      variant="danger mb-1 mt-5 ml-10"
      onClick={onDeleteUser}
      disabled={loading || AdminStore.checkedUsers.length === 0}
    >
      {loading ? t('inProgressMessage') : t("deleteButton")}
    </Button>
  );
})

export default DeleteUserButton