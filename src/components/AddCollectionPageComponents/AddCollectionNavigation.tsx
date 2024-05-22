import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

const AddCollectionNavigation = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/collections" }}>
        Collections
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Add collection</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default AddCollectionNavigation