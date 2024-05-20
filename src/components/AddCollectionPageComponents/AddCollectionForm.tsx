import { Container, Form, FormGroup, Button, Row, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import CustomFieldCreator from "./CustomFieldCreator";
import { AddCollectionFormInput } from "../../types/AddCollectionFormInput";
import CollectionStore from "../../store/CollectionStore";
import { observer } from "mobx-react-lite";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCollection } from "../../api/collection";
import { useFileUpload } from "../../hooks/useFileUpload";
import { getFullData } from "../../service/collections-service";
import { createCollectionSchema } from "../../service/validations/collectionValidations";
import CategorySelectComponent from "./CategorySelectComponent";
import CategoryNameComponent from "./CategoryNameComponent";
import CategoryDescriptionComponent from "./CategoryDescriptionComponent";
import ImageUpload from "./ImageUpload";

const AddCollectionForm = observer(() => {
  const {t} = useTranslation();
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const [loading, setLoading] = useState(false)
  const {getRootProps, getInputProps, acceptedFiles, upload} = useFileUpload();

  const { register, handleSubmit, setValue, watch, formState: { errors }} = useForm<AddCollectionFormInput>({
    resolver: yupResolver(createCollectionSchema(t)),
  });

  useEffect(() => {
    register('description');
  }, [register]);

  const onSubmit = async (formData: AddCollectionFormInput) => {
    try {
      setLoading(true);
      const imageUrl = (await upload(acceptedFiles)) || "";
      const fullData = getFullData(formData, imageUrl, CollectionStore.customFields)
      const res = await createCollection(fullData);
      notifySuccess(res.data?.message)
    } catch (e) {notifyError('collectionError')}
    setLoading(false)
  };

  return (
    <Container className="d-flex w-100 container-min-height">
      <Container className="border rounded px-4 py-3 shadow add-collection-form-container">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row>
            <CategoryNameComponent register={register} errors={errors} />
            <CategorySelectComponent register={register} errors={errors} />
          </Row>
          <CategoryDescriptionComponent
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <ImageUpload
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            acceptedFiles={acceptedFiles}
          />
          <FormGroup className="mb-3">
            <Form.Label>{t("customFieldLabel")}</Form.Label>
            <CustomFieldCreator />
          </FormGroup>
          <Button variant="primary" type="submit" className="w-100">
            {loading ? <Spinner animation="border" /> : t("createButton")}
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </Container>
  );
})

export default AddCollectionForm