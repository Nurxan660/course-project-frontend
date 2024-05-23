import { Container, Form, FormGroup, Button, Row, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect} from "react";
import CustomFieldCreator from "./CustomFieldCreator";
import { AddCollectionFormInput } from "../../types/collection-types/AddCollectionFormInput";
import 'react-toastify/dist/ReactToastify.css';
import { createCollectionSchema } from "../../service/validations/collectionValidations";
import CategorySelectComponent from "./CategorySelectComponent";
import CategoryNameComponent from "./CategoryNameComponent";
import CategoryDescriptionComponent from "./CategoryDescriptionComponent";
import ImageUpload from "./ImageUpload";
import { CollectionFormProps } from "../../types/props-types/CollectionFormProps";
import { useCollectionFormStore } from "../../context/CollectionFormContext";
import { observer } from "mobx-react-lite";

const AddCollectionForm = observer(({getRootProps, getInputProps, acceptedFiles, onSubmit, loading, isEdit, defaultValues}: CollectionFormProps) => {
  const {t} = useTranslation();
  const store = useCollectionFormStore();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors }} = useForm<AddCollectionFormInput>({
    resolver: yupResolver(createCollectionSchema(t)),
    
  });

  useEffect(() => {
    if (store?.defaultValues) {
      reset(store.defaultValues);
    }
  }, [store?.defaultValues]);

  useEffect(() => {
    register('description');
  }, [register]);


  return (
    <Container className="d-flex w-100">
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
    </Container>
  );
})

export default AddCollectionForm