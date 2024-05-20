import CollectionStore from "../../store/CollectionStore"
import { FormLabel } from "react-bootstrap"
import { observer } from "mobx-react-lite";

const CustomFieldList = observer(() => {
  const handleDeleteField = (index: number) => {
    CollectionStore.removeCustomField(index)
  }
  return (
    <>
      {CollectionStore.customFields.map((v, index) => {
        return (
          <div key={index} className="d-inline-block mb-2">
            <div className='d-flex justify-content-center align-items-center custom-field-element'>
            <span>{v.name} ({v.type})</span>
            <i className="bi bi-x-circle ml-5 custom-field-delete" onClick={() => handleDeleteField(index)}></i>
            </div>
          </div>
        );
      })}
    </>
  );
});


export default CustomFieldList