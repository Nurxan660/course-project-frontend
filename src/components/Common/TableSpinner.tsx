import { Spinner } from "react-bootstrap";
import { TableSpinnerProps } from "../../types/props-types/TableSpinnerProps";

const TableSpinner = ({ colspan = 3 } : TableSpinnerProps) => {
    return (
      <tr>
        <td colSpan={colspan}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <Spinner animation="border" role="status" />
          </div>
        </td>
      </tr>
    ); 
};
  

export default TableSpinner