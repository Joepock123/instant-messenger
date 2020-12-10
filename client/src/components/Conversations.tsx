import React, { FunctionComponent } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useConversations } from 'contexts/ConversationsProvider';

export const Conversations: FunctionComponent<{}> = () => {
  const {
    conversations,
    selectedConversationId,
    setSelectedConversationId,
    deleteConversation,
  } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations?.map((conversation) => (
        <ListGroup.Item
          key={conversation.conversationId}
          action
          onClick={() => setSelectedConversationId(conversation.conversationId)}
          active={conversation.conversationId === selectedConversationId}
        >
          {conversation.recipients.map((r) => r.name).join(', ')}
          <Button onClick={() => deleteConversation(conversation.conversationId)}>Delete</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
