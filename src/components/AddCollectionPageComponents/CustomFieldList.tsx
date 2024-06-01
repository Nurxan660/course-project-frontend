import { observer } from "mobx-react-lite";
import { useCollectionFormStore } from "../../context/CollectionFormContext";
import Table from 'react-bootstrap/Table';
import { useTranslation } from "react-i18next";

const CustomFieldList = observer(() => {
  const store = useCollectionFormStore();
  const { t } = useTranslation();

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
            <th>{t('nameLabel')}</th>
            <th>{t('typeLabel')}</th>
            <th>{t('fieldRequired')}</th>
            <th>{t('showInTableBoolean')}</th>
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
                <td>{String(v.showInTable)}</td>
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
