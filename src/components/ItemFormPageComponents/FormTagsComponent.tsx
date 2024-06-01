import { Col, Form } from "react-bootstrap"
import CreatableSelect from 'react-select/creatable';
import { searchTags } from "../../api/item";
import { useItemFormStore } from "../../context/ItemFormContext";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FormTagsComponent = observer(() => {
  const store = useItemFormStore();
  const { t } = useTranslation();

  const handleSearchTags = async () => {
    try {
      store?.setLoading(true);
      const res = await searchTags(store?.tagValue || '');
      store?.setTagsOption(res.data);
    } catch {  }
    store?.setLoading(false);
  }

  const handleOnChange = (value: any) => {
    store?.setSelectedTags(value)
    store?.setTagErrorMessage('')
  }

  useEffect(() => {
    handleSearchTags();
  }, [store?.tagValue])
  
  return (
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label>{t('tagLabel')}</Form.Label>
        <CreatableSelect
          value={store?.selectedTags}
          inputValue={store?.tagValue}
          onChange={handleOnChange}
          onInputChange={(value) => store?.setTagValue(value)}
          options={store?.tagsOption}
          isMulti
          className={store?.tagErrorMessage ? "tag-validation-error-input" : ''}
          isLoading={store?.loading}
          noOptionsMessage={() => t('noOptionMessageTags')}
          loadingMessage={() => t('loadingMessage')}
          formatCreateLabel={(inputValue) => `${t('createTagLabel')} "${inputValue}"`}
        />
        {store?.tagErrorMessage && (
          <span className='description-validation-message'>{store.tagErrorMessage}</span>
        )}
      </Form.Group>
    </Col>
  );
});

export default FormTagsComponent