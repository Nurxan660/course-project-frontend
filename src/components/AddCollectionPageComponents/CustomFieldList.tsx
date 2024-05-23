import { observer } from "mobx-react-lite";
import { useCollectionFormStore } from "../../context/CollectionFormContext";

const CustomFieldList = observer(() => {
  const store = useCollectionFormStore();

  const handleDeleteField = (index: number) => {
    store?.removeCustomField(index)
  }
  return (
    <>
      {store?.customFields?.map((v, index) => {
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