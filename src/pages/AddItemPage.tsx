import { useEffect } from 'react'
import { useItemFormStore } from '../context/ItemFormContext'
import { getCollectionCustomFields } from '../api/custom_field'
import { useParams } from 'react-router-dom'
import ItemForm from '../components/ItemFormPageComponents/ItemForm'
import { transformItemCreateData } from '../service/utils/itemUtils'
import { createItem } from '../api/item'
import { ToastContainer, toast } from 'react-toastify';
import ItemFormNavigation from '../components/ItemFormPageComponents/ItemFormNavigation'
import { useTranslation } from 'react-i18next'
import { translate } from '@vitalets/google-translate-api'

const AddItemPage = () => {
  const store = useItemFormStore();
  const params = useParams();
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const { t } = useTranslation();
  
  const handleLoadCustomFields = async () => {
    store?.setLoadingCustomFields(true);
    await loadCustomFields()
    store?.setLoadingCustomFields(false);
  }

  const loadCustomFields = async () => {
    try {
      const res = await getCollectionCustomFields(Number(params.id));
      store?.setCustomFields(res.data);
    } catch (e) {}
  };

  useEffect(() => {
    handleLoadCustomFields()
  }, [])

  const onSubmit = async (data: any) => {
    /*if (!store?.validateTags(t('fieldRequired'))) return
    store?.setLoading(true);
    await handleCreateItem(data);
    store?.setLoading(false);*/
    console.log("привет")
    const { text } = await translate('Привет, мир! Как дела?', { to: 'en' });
    console.log("перевод", text)
  };

  const handleCreateItem = async (data: any) => {
    const transformedData = transformItemCreateData(data, Number(params.id), store?.selectedTags || []);
    try {
      const res = await createItem(transformedData);
      notifySuccess(res.data.message);
    } catch (e: any) { notifyError(e?.response?.data?.message) }
  };

  return (
    <>
    <ItemFormNavigation isEdit={false}/>
    <ItemForm onSubmit={onSubmit} isEdit={false}/>
    <ToastContainer />
    </>
  )
}

export default AddItemPage