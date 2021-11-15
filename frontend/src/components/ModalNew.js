import React from "react";
import { Modal, Button } from "react-bootstrap";
import { createPortal } from "react-dom";

import Spinner from "../components/Spinner";
import BookingAddScreen from "../screens/BookingAddScreen";

import { useSelector } from "react-redux";

const ModalNew = ({ children, visible, toggle }) => {
  const bookingCreate = useSelector((state) => state.bookingCreate);
  const { loading: BookingCreateLoading } = bookingCreate;

  return visible
    ? createPortal(
        <Modal
          fullscreen='lg-down'
          contentClassName='newmodal'
          dialogClassName='dialognew'
          show={visible}
          size='xl'
          key={true}
          onHide={toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {BookingCreateLoading ? (
              <Spinner />
            ) : (
              <BookingAddScreen modalswitch={true} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={toggle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>,
        document.getElementById("modal")
      )
    : null;
};

export default ModalNew;
