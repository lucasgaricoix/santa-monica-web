import React, { useState, useEffect } from "react";
import { Carousel, Modal } from "react-bootstrap";
import "./style/modalphotos.css";

type Props = {
  handleShowModalPhotos(): void;
  showModalPhotos: boolean;
  photos: string[];
  currentImage: number;
};

const ModalPhotos: React.FC<Props> = ({
  handleShowModalPhotos,
  showModalPhotos,
  photos,
  currentImage
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(currentImage);
  }, [currentImage]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Modal
      show={showModalPhotos}
      onHide={handleShowModalPhotos}
      dialogClassName="modal-content"
    >
      <Modal.Header closeButton />

      <Modal.Body>
        <Carousel fade={true} activeIndex={index} onSelect={handleSelect}>
          {photos.map((photo, index) => (
            <Carousel.Item key={`col-inside-photo-${index}`}>
              <img
                style={{ maxWidth: "100%", height: "auto" }}
                src={photo}
                alt={`inside-${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPhotos;
