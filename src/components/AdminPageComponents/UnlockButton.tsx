import { Button, Spinner } from 'react-bootstrap'
import AdminStore from '../../store/AdminStore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const UnlockButton = observer(() => {
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const onUnblockUser = async () => {
    setLoading(true);
    await AdminStore.handleBlockUser(false, notifySuccess);
    setLoading(false);
  };

  return (
    <Button
      variant="secondary mb-1 mt-5 ml-10"
      onClick={onUnblockUser}
      disabled={loading || AdminStore.checkedUsers.length === 0}
    >
      {loading ? t('inProgressMessage') : t('unblockUserButton')}
    </Button>
  );
  
})

export default UnlockButton