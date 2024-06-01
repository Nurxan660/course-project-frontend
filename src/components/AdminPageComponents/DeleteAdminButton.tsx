import { Button } from "react-bootstrap"
import AdminStore from '../../store/AdminStore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import UserRoles from "../../enum/UserRoles";

const DeleteAdminButton = observer(() => {
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const onChangeRoleToAdmin = async () => {
    setLoading(true);
    await AdminStore.handleChangeUserRole(UserRoles.USER, notifySuccess);
    setLoading(false);
  };

  return (
    <Button
      variant="success mb-1 mt-5 ml-10"
      onClick={onChangeRoleToAdmin}
      disabled={loading || AdminStore.checkedUsers.length === 0}
    >
      {loading ? t('inProgressMessage') : t("deleteFromAdminsButton")}
    </Button>
  );
})

export default DeleteAdminButton