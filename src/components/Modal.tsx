import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    handleShowModal(): void,
    showModal: boolean
}

const ModalForm: React.FC<Props> = ({handleShowModal, showModal}) => (
      <>  
        <Modal show={showModal} onHide={handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Solicitar requisiçao Espaço Santa Monica</Modal.Title>
          </Modal.Header>
          <Modal.Body>Por favor, preencha este formulário e em breve, nós vamos entrar em contato.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShowModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleShowModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

export default ModalForm;