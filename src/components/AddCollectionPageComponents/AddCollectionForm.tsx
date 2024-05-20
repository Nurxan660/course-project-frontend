import { Container, Form, FormControl, FormGroup, Button, Row, Col, Spinner } from "react-bootstrap"
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../api/file";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import CustomFieldCreator from "./CustomFieldCreator";
import { AddCollectionFormInput } from "../../types/AddCollectionFormInput";
import { getCollections, createCollection } from "../../api/collection";
import { CollectionCategory } from "../../types/CollectionCategory";
import CollectionStore from "../../store/CollectionStore";
import { FullCollectionData } from "../../types/FullCollectionData";
import { observer } from "mobx-react-lite";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCollectionForm = observer(() => {
  const {t} = useTranslation();
  const [categories, setCategories] = useState<CollectionCategory[]>([])
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const [loading, setLoading] = useState(false)

  const loadCollections = async () => {
    try {
      const res = await getCollections()
      setCategories(res.data)
    } catch (e) { console.log(e) }
  }

  useEffect(() => {
    loadCollections()
  }, [])

  const upload = async (files: File[]) => {
    if(files.length === 0) return ''
    try {
      const res = await uploadFile(files[0]);
      return res.data.data.display_url;
    } catch (e) { notifyError('imageUploadError') }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required(t('fieldRequired')),
    category: yup.string().required(t('fieldRequired')),
    description: yup.string().required(t('fieldRequired'))
  });

  const { register, handleSubmit, setValue, watch, formState: { errors }} = useForm<AddCollectionFormInput>({
    resolver: yupResolver(validationSchema),
  });

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { 'image/jpeg': ['.jpeg', '.png']}
  });

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name}
    </li>
  ));

  useEffect(() => {
    register('description');
  }, [register]);

  const handleDescriptionChange = (value?: string) => {
    setValue('description', value || '', { shouldValidate: true });
  };

  const onSubmit = async (formData: AddCollectionFormInput) => {
    try {
      setLoading(true);
      const imageUrl = (await upload(acceptedFiles)) || "";
      const fullData: FullCollectionData = {
        ...formData,
        imageUrl: imageUrl,
        customFields: CollectionStore.customFields,
      };
      const res = await createCollection(fullData);
      notifySuccess(res.data?.message)
    } catch (e) {notifyError('collectionError')}
    setLoading(false)
  };

  const capitalizeFirstLetter = (category: string) => {
    if (!category) return category;
    return category.charAt(0).toLowerCase() + category.slice(1);
  }

  return (
    <Container className="d-flex w-100 container-min-height">
      <Container className="border rounded px-4 py-3 shadow add-collection-form-container">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row>
            <Col>
              <FormGroup className="mb-3">
                <Form.Label>{t("nameLabel")}</Form.Label>
                <FormControl
                  type="text"
                  placeholder={t("collectionNamePlaceholder")}
                  isInvalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name.message}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="mb-3">
                <Form.Label>{t("categoryLabel")}</Form.Label>
                <Form.Select
                  isInvalid={!!errors.category}
                  {...register("category")}
                >
                  <option value="" hidden>
                    {t("categoryPlaceholder")}
                  </option>
                  {categories.map((v) => {
                    return (
                      <option value={v.name}>
                        {t(`${capitalizeFirstLetter(v.name)}Category`)}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.category && (
                  <Form.Control.Feedback type="invalid">
                    {errors.category.message}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="mb-3">
            <Form.Label>{t("descriptionLabel")}</Form.Label>
            <MDEditor
              value={watch("description")}
              onChange={handleDescriptionChange}
              className={errors.description ? 'description-validation' : ''}
            />
            {errors.description && (
              <p className="description-validation-message">
                {errors.description.message}
              </p>
            )}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>{t("imageLabel")}</Form.Label>
            <div {...getRootProps()} className="image-dropdown">
              <input {...getInputProps()} />
              <p>{t("fileDropdownLabel")}</p>
            </div>
            <aside>
              <ul className="break-word">{files}</ul>
            </aside>
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>{t("customFieldLabel")}</Form.Label>
            <CustomFieldCreator />
          </FormGroup>
          <Button variant="primary" type="submit" className="w-100">
            {loading ? <Spinner animation="border" /> : t("createButton") }
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </Container>
  );
})

export default AddCollectionForm