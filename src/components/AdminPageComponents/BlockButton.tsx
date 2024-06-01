import { Button, Spinner } from 'react-bootstrap'
import AdminStore from '../../store/AdminStore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const BlockButton = observer(() => {
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const onBlockUser = async () => {
    setLoading(true);
    await AdminStore.handleBlockUser(true, notifySuccess);
    setLoading(false);
  };

  return (
    <Button
      variant="primary mb-1 mt-5"
      onClick={onBlockUser}
      disabled={loading || AdminStore.checkedUsers.length === 0}
    >
      {loading ? t('inProgressMessage') : t('blockUserButton')}
    </Button>
  );
})

export default BlockButton