import { Modal, Button } from 'react-bootstrap';
import "./styles.css";

function ModalComponent(props) {

  const { show,
    handleClose,
    handleSave,
    title,
    body,
    backdropClassName } = props;

  return (
    <>
      {show && <div className="custom-backdrop" />}

      <Modal
        show={show}
        onHide={handleClose}
        backdropClassName={backdropClassName}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;