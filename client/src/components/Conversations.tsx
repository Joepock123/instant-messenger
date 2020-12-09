import React, { FunctionComponent, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useConversations } from 'contexts/ConversationsProvider';
import { useContacts } from 'contexts/ContactsProvider';
import { IContact } from 'types';

export const Conversations: FunctionComponent<{}> = () => {
  const { contacts } = useContacts();
  const {
    conversations,
    setConversations,
    selectedConversationId,
    setSelectedConversationId,
  } = useConversations();
  console.log('conversations', conversations);

  const handleDeleteConversation = (conversationId) => {
    const updatedConversations = conversations.filter(
      (conversation) => conversation.conversationId !== conversationId,
    );
    setConversations(updatedConversations);
  };

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation) => (
        <ListGroup.Item
          key={conversation.conversationId}
          action
          onClick={() => setSelectedConversationId(conversation.conversationId)}
          active={conversation.conversationId === selectedConversationId}
        >
          {conversation.recipients.map((r) => r.name).join(', ')}
          <Button onClick={() => handleDeleteConversation(conversation.conversationId)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
