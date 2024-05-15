import { Container, Form, FormControl, FormGroup, Button } from "react-bootstrap"
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../api/file";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

interface FormInput {
  name: string;
  category: string;
}

const AddCollectionForm = () => {
  const {t} = useTranslation();
  const [description, setDescription] = useState("");

  const upload = async (file: File) => {
    try {
      const res = await uploadFile(file);
    } catch (e) { console.log(e) }
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('name is required'),
    category: yup.string().required('category is required'),
  });

  const { register, handleSubmit, formState: { errors }} = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
  });

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { 'image/jpeg': ['.jpeg', '.png']},
    onDrop: async (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => upload(file));
    }
  });

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name}
    </li>
  ));

  const handleDescriptionChange = (value?: string) => {
    if (value !== undefined) setDescription(value);
  };

  const onSubmit = () => {

  }

  return (
    <Container className="d-flex w-100 container-min-height">
      <Container className="border rounded px-4 py-3 shadow add-collection-form-container">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <FormGroup className="mb-3">
            <Form.Label>{t("categoryLabel")}</Form.Label>
            <Form.Select
              isInvalid={!!errors.category}
              {...register("category")}
            >
              <option value="" hidden>
                {t("categoryPlaceholder")}
              </option>
              <option value="Books">{t("booksCategory")}</option>
              <option value="Signs">{t("signsCategory")}</option>
              <option value="Silverware">{t("silverwareCategory")}</option>
              <option value="Other">{t("otherCategory")}</option>
            </Form.Select>
            {errors.category && (
              <Form.Control.Feedback type="invalid">
                {errors.category.message}
              </Form.Control.Feedback>
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
            <Form.Label>{t("descriptionLabel")}</Form.Label>
            <MDEditor value={description} onChange={handleDescriptionChange} />
          </FormGroup>
          <Button variant="primary" type="submit" className="w-100">
            {t("createButton")}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default AddCollectionForm