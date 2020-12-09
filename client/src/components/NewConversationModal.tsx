import React, { FunctionComponent, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

import { useContacts } from 'contexts/ContactsProvider';
import { useConversations } from 'contexts/ConversationsProvider';

type Props = { closeModal: () => void };

export const NewConversationModal: FunctionComponent<Props> = ({ closeModal }) => {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();

  // @ts-ignore
  const { conversations, setConversations } = useConversations();

  const createRecipientsList = (selectedContactIds) => {
    return selectedContactIds.map((selectedContactId) =>
      contacts.find((contact) => contact.id === selectedContactId),
    );
  };

  const createConversation = (selectedContactIds) => {
    const recipientsList = createRecipientsList(selectedContactIds);
    const conversationId = uuidV4();

    setConversations([
      ...conversations,
      { conversationId: conversationId, recipients: recipientsList, messages: [] },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                // @ts-ignore
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" disabled={selectedContactIds.length === 0}>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};
