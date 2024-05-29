import { Spinner } from 'react-bootstrap'
import ItemListStore from '../../store/ItemListStore'

const TableSpinner = () => {
  return (
    <tr>
      <td colSpan={3 + ItemListStore.items.customFieldNames.length}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </td>
    </tr>
  );
}

export default TableSpinner