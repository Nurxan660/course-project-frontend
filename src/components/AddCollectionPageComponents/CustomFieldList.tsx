import CollectionStore from "../../store/CollectionStore"
import { FormLabel } from "react-bootstrap"
import { observer } from "mobx-react-lite";

const CustomFieldList = observer(() => {
  return (
    <>
      {CollectionStore.customFields.map((v, index) => {
        return (
          <FormLabel key={index}>
            {v.name} ({v.type}),&nbsp;
          </FormLabel>
        );
      })}
    </>
  );
});


export default CustomFieldList