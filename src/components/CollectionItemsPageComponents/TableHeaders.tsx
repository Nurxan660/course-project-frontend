import { getTokens } from '../../service/utils/tokenUtils';
import { Form } from 'react-bootstrap';
import ItemListStore from '../../store/ItemListStore';
import { observer } from 'mobx-react-lite';

const TableHeaders = observer(() => {
    const currentUser = getTokens();

  return (
    <thead>
      <tr className="text-center align-middle">
        {currentUser && (
          <th>
            <Form.Check onClick={() => ItemListStore.handleCheckAll()} />
          </th>
        )}
        <th>№</th>
        <th>Name</th>
        {ItemListStore.items.customFieldNames.map((v) => {
          return <th key={v}>{v}</th>;
        })}
      </tr>
    </thead>
  );
})

export default TableHeaders