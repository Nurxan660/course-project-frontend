import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteModalStore from '../../store/DeleteModalStore';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';

const DeleteModal = observer(() => {
  return (
    <Modal
      show={DeleteModalStore.showModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => DeleteModalStore.closeModal()}
        >
          Cancel
        </Button>
        <Button onClick={() => DeleteModalStore.confirmDelete()} className='delete-button-flex'>
          {DeleteModalStore.loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
})

export default DeleteModal