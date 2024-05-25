import { useFileUpload } from "../hooks/useFileUpload";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddCollectionNavigation from "../components/AddCollectionPageComponents/AddCollectionNavigation";
import AddCollectionForm from "../components/AddCollectionPageComponents/AddCollectionForm";
import { AddCollectionFormInput } from "../types/collection-types/AddCollectionFormInput";
import { getCollection } from "../api/collection";
import { useParams } from "react-router-dom";
import { useCollectionFormStore } from "../context/CollectionFormContext";
import { editCollection } from "../api/collection";
import { getFullData } from "../service/collections-service";
import CustomFieldModal from "../components/AddCollectionPageComponents/CustomFieldModal";

const EditCollectionPage = () => {
  const store = useCollectionFormStore();
  const { getRootProps, getInputProps, acceptedFiles, upload } = useFileUpload();
  const [loading, setLoading] = useState(false);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const params = useParams();

  const loadCollection = async () => {
    try {
      const res = await getCollection(Number(params.id));
      store?.setDefaultCustomFields(res.data.customFields);
      store?.setDefaultValues(res.data)
    } catch (e) {}
  };

  useEffect(() => {
    loadCollection();
  }, []);

  const onSubmit = async (formData: AddCollectionFormInput) => {
    try {
    setLoading(true);
      const imageUrl = (await upload(acceptedFiles)) || "";
      const fullData = getFullData(formData, imageUrl, store?.customFields || [])
      const res = await editCollection(fullData, Number(params.id));
      notifySuccess(res.data?.message);
    } catch (e) {notifyError('collectionError')}
    setLoading(false)
  };

  return (
    <>
      <AddCollectionNavigation isEdit={true} />
      <AddCollectionForm
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        acceptedFiles={acceptedFiles}
        onSubmit={onSubmit}
        loading={loading}
        isEdit={true}
      />
      <CustomFieldModal />
      <ToastContainer />
    </>
  );
};

export default EditCollectionPage;
