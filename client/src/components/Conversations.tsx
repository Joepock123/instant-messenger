import React, { FunctionComponent, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from 'contexts/ConversationsProvider';
import { useContacts } from 'contexts/ContactsProvider';
import { IContact } from 'types';

export const Conversations: FunctionComponent<{}> = () => {
  const { contacts } = useContacts();
  const { conversations, selectedConversationId, setSelectedConversationId } = useConversations();

  // This would usually happen on the backend
  // const decoratedConversations = conversations.map((conversation) => {
  //   const recipients: Array<IContact> = conversation.recipients.map((recipientId) => {
  //     return contacts.find((contact) => contact.id === recipientId);
  //   });
  //   return { ...conversation, recipients };
  // });

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
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
