import AddCollectionForm from "../components/AddCollectionPageComponents/AddCollectionForm";
import AddCollectionNavigation from "../components/AddCollectionPageComponents/AddCollectionNavigation";
import { useFileUpload } from "../hooks/useFileUpload";
import { AddCollectionFormInput } from "../types/collection-types/AddCollectionFormInput";
import { useState } from "react";
import { getFullData } from "../service/utils/collectionUtils";
import { createCollection } from "../api/collection";
import { ToastContainer, toast } from 'react-toastify';
import { useCollectionFormStore } from "../context/CollectionFormContext";
import CustomFieldModal from "../components/AddCollectionPageComponents/CustomFieldModal";

const AddCollectionPage = () => {
  const store = useCollectionFormStore();
  const [loading, setLoading] = useState(false)
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const {getRootProps, getInputProps, acceptedFiles, upload} = useFileUpload();

  const onSubmit = async (formData: AddCollectionFormInput) => {
    try {
      setLoading(true);
      const imageUrl = (await upload(acceptedFiles)) || "";
      const fullData = getFullData(formData, imageUrl, store?.customFields || [])
      const res = await createCollection(fullData);
      notifySuccess(res.data?.message)
    } catch (e) { notifyError('collectionError') }
    setLoading(false)
  };
  return (
    <>
      <AddCollectionNavigation isEdit={false} />
        <AddCollectionForm
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          acceptedFiles={acceptedFiles}
          onSubmit={onSubmit}
          loading={loading}
          isEdit={false}
        />
        <CustomFieldModal />
      <ToastContainer />
    </>
  );
};

export default AddCollectionPage;
