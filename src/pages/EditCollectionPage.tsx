import { useFileUpload } from "../hooks/useFileUpload";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddCollectionNavigation from "../components/AddCollectionPageComponents/AddCollectionNavigation";
import AddCollectionForm from "../components/AddCollectionPageComponents/AddCollectionForm";
import { AddCollectionFormInput } from "../types/collection-types/AddCollectionFormInput";
import { getCollection } from "../api/collection";
import { useParams } from "react-router-dom";
import { FullCollectionData } from "../types/collection-types/FullCollectionData";
import CollectionFormStore from "../store/CollectionFormStore";
import { CollectionFormStoreProvider } from "../context/CollectionFormContext";
import { useCollectionFormStore } from "../context/CollectionFormContext";

const EditCollectionPage = () => {
  const store = useCollectionFormStore();
  const { getRootProps, getInputProps, acceptedFiles, upload } = useFileUpload();
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<FullCollectionData>();
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

  const onSubmit = (formData: AddCollectionFormInput) => {};

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
          defaultValues={defaultValues}
        />
      <ToastContainer />
    </>
  );
};

export default EditCollectionPage;
