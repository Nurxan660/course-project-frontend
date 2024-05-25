import { observer } from "mobx-react-lite";
import { useCollectionFormStore } from "../../context/CollectionFormContext";
import Table from 'react-bootstrap/Table';

const CustomFieldList = observer(() => {
  const store = useCollectionFormStore();

  const handleDeleteField = (index: number) => {
    store?.removeCustomField(index);
  };
  return (
    <>
    {store?.customFields.length || 0 > 0 ? (
    <div style={{ overflowY: 'auto', maxHeight: '200px' }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {store?.customFields?.map((v, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{v.name}</td>
                <td>{v.type}</td>
                <td>{String(v.isRequired)}</td>
                <td className="center-icons">
                    <i className="bi bi-trash cursor-pointer" onClick={() => handleDeleteField(index)}></i>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    ) : <></>}
    </>
  );
});

export default CustomFieldList;
