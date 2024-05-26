import { useEffect } from 'react'
import { useItemFormStore } from '../context/ItemFormContext'
import { getCollectionCustomFields } from '../api/custom_field'
import { useParams } from 'react-router-dom'
import ItemForm from '../components/ItemFormPageComponents/ItemForm'
import { transformItemCreateData } from '../service/utils/itemUtils'
import { createItem } from '../api/item'
import { ToastContainer, toast } from 'react-toastify';
import ItemFormNavigation from '../components/ItemFormPageComponents/ItemFormNavigation'

const AddItemPage = () => {
  const store = useItemFormStore();
  const params = useParams();
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const loadCustomFields = async () => {
    try {
      const res = await getCollectionCustomFields(Number(params.id));
      store?.setCustomFields(res.data)
    } catch (e) { }
  }

  useEffect(() => {
    loadCustomFields()
  }, [])

  const onSubmit = async (data: any) => {
    store?.setLoading(true);
    const transformedData = transformItemCreateData(data, Number(params.id));
    try {
      const res = await createItem(transformedData);
      notifySuccess(res.data.message)
    } catch (e: any) { notifyError(e?.response?.data?.message) }
    store?.setLoading(false);
  };

  return (
    <>
    <ItemFormNavigation />
    <ItemForm onSubmit={onSubmit}/>
    <ToastContainer />
    </>
  )
}

export default AddItemPage