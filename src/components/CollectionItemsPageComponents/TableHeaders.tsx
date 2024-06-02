import { getTokens } from '../../service/utils/authUtils';
import { Form } from 'react-bootstrap';
import ItemListStore from '../../store/ItemListStore';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const TableHeaders = observer(() => {
    const currentUser = getTokens();
    const { t } = useTranslation();

  return (
    <thead>
      <tr className="text-center align-middle">
        {currentUser && (
          <th>
            <Form.Check
              onClick={() => ItemListStore.handleCheckAll()}
              checked={ItemListStore.areAllItemsChecked()}
            />
          </th>
        )}
        <th>№</th>
        <th>{t("nameLabel")}</th>
        {ItemListStore.items.customFieldNames.map((v) => {
          return <th key={v}>{v}</th>;
        })}
      </tr>
    </thead>
  );
})

export default TableHeaders