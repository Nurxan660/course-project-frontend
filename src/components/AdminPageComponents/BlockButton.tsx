import { Button, Spinner } from 'react-bootstrap'
import { updateUserBlockedStatus } from '../../api/admin';
import AdminStore from '../../store/AdminStore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const BlockButton = observer(() => {
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const handleBlockUser = async () => {
    try {
      setLoading(true);
      const res = await updateUserBlockedStatus(true, AdminStore.checkedUsers);
      AdminStore.setIsAction(!AdminStore.isAction);
      notifySuccess(res.data.message);
    } catch (e) { }
    setLoading(false)
  }

  return (
    <Button
      variant="primary mb-1 mt-5"
      onClick={handleBlockUser}
      disabled={loading || AdminStore.checkedUsers.length === 0}
    >
      {loading ? 'In progress...' : t('blockUserButton')}
    </Button>
  );
})

export default BlockButton