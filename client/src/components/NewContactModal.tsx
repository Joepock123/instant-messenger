import React, { FunctionComponent, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { useContacts } from 'contexts/ContactsProvider';

type Props = { closeModal: () => void };

export const NewContactModal: FunctionComponent<Props> = ({ closeModal }) => {
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const { contacts, setContacts } = useContacts();

  const createContact = (id, name) => {
    setContacts([...contacts, { id, name }]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};
