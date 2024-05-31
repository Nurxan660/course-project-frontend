import { useEffect } from 'react'
import { useItemFormStore } from '../context/ItemFormContext'
import { getCollectionCustomFields } from '../api/custom_field'
import { useParams } from 'react-router-dom'
import ItemForm from '../components/ItemFormPageComponents/ItemForm'
import { ToastContainer, toast } from 'react-toastify';
import ItemFormNavigation from '../components/ItemFormPageComponents/ItemFormNavigation'
import { getCustomFieldWithValue } from '../api/custom_field'
import { transformItemEditData } from '../service/utils/itemUtils'
import { editItem } from '../api/item'
import { useTranslation } from 'react-i18next'

const EditItemPage = () => {
  const store = useItemFormStore();
  const { t } = useTranslation();
  const params = useParams();
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const loadCustomFields = async () => {
    store?.setLoadingCustomFields(true);
    try {
      const res = await getCollectionCustomFields(Number(params.id));
      const customFieldWithValue = await getCustomFieldWithValue(Number(params.itemId));
      store?.setCustomFields(res.data);
      store?.setDefaultValues(customFieldWithValue.data);
    } catch (e) { }
    store?.setLoadingCustomFields(false);
  }

  useEffect(() => {
    loadCustomFields()
  }, [])

  const onSubmit = async (data: any) => {
    if (!store?.validateTags(t('fieldRequired'))) return
    store?.setLoading(true);
    try {
      const res = await editItem(Number(params.itemId), transformItemEditData(data, store?.selectedTags || []));
      notifySuccess(res.data.message);
    } catch (e) {  }
    store?.setLoading(false);
  };

  return (
    <>
    <ItemFormNavigation isEdit={true}/>
    <ItemForm onSubmit={onSubmit} isEdit={true}/>
    <ToastContainer />
    </>
  )
}

export default EditItemPage