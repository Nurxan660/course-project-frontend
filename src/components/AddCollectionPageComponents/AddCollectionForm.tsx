import { Container, Form, FormControl, FormGroup, Button } from "react-bootstrap"
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../api/file";
import { useTranslation } from "react-i18next";

const AddCollectionForm = () => {
  const {t} = useTranslation();
  
  const upload = async (file: File) => {
    try {
      const res = await uploadFile(file);
    } catch (e) { console.log(e) }
  }

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

  return (
    <Container
      className="d-flex w-100"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Container
        className="border rounded px-4 py-3 m-auto shadow"
        style={{ maxWidth: "400px" }}
      >
        <Form>
          <FormGroup className="mb-3">
            <Form.Label>{t('nameLabel')}</Form.Label>
            <FormControl type="text" placeholder={t('collectionNamePlaceholder')} />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>{t('categoryLabel')}</Form.Label>
            <Form.Select>
              <option value="" hidden>
                {t('categoryPlaceholder')}
              </option>
              <option value="Books">{t('booksCategory')}</option>
              <option value="Signs">{t('signsCategory')}</option>
              <option value="Silverware">{t('silverwareCategory')}</option>
              <option value="Other">{t('otherCategory')}</option>
            </Form.Select>
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>{t('imageLabel')}</Form.Label>
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #dee2e6",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <input {...getInputProps()} />
              <p>{t('fileDropdownLabel')}</p>
            </div>
            <aside>
              <ul className="break-word">{files}</ul>
            </aside>
          </FormGroup>
        </Form>
      </Container>
    </Container>
  );
}

export default AddCollectionForm