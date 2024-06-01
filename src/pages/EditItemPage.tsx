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

  const loadCustomFields = async () => {
    store?.setLoadingCustomFields(true);
    await handleGetCustomFieldsValues();
    store?.setLoadingCustomFields(false);
  }

  const handleGetCustomFieldsValues = async () => {
    try {
      const res = await getCollectionCustomFields(Number(params.id));
      const customFieldWithValue = await getCustomFieldWithValue(Number(params.itemId));
      store?.setCustomFields(res.data);
      store?.setDefaultValues(customFieldWithValue.data);
    } catch (e) {}
  };

  useEffect(() => {
    loadCustomFields()
  }, [])

  const onSubmit = async (data: any) => {
    if (!store?.validateTags(t('fieldRequired'))) return
    store?.setLoading(true);
    await handleEditItem(data);
    store?.setLoading(false);
  };

  const handleEditItem = async (data: any) => {
    try {
      const res = await editItem(Number(params.itemId), transformItemEditData(data, store?.selectedTags || []));
      notifySuccess(res.data.message);
    } catch (e) {  }
  }

  return (
    <>
    <ItemFormNavigation isEdit={true}/>
    <ItemForm onSubmit={onSubmit} isEdit={true}/>
    <ToastContainer />
    </>
  )
}

export default EditItemPage