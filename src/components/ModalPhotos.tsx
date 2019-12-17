import React from 'react';
import { Modal, Image } from 'react-bootstrap';

type Props = {
  handleShowModalPhotos(): void;
  showModalPhotos: boolean;
  photos: string[]
}

const ModalPhotos: React.FC<Props> = ({ handleShowModalPhotos, showModalPhotos, photos }) => (
  <Modal
    size='lg'
    show={showModalPhotos}
    onHide={handleShowModalPhotos}
    dialogClassName="modal-90w"
  >
    <Modal.Header closeButton />

    <Modal.Body>
        <p>
          <Image src={photos[0]} width={1000} alt="1" />
        </p>
    </Modal.Body>
  </Modal>
)

export default ModalPhotos;