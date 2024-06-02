import { ListGroup, Spinner } from "react-bootstrap"

const LiveSearchSpinner = () => {
  return (
    <ListGroup>
      <ListGroup.Item className="d-flex justify-content-center align-items-center">
        <Spinner />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default LiveSearchSpinner