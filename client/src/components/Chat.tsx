import React, { FunctionComponent, useState } from 'react';

import { useConversations } from 'contexts/ConversationsProvider';
import { Button, Form, InputGroup } from 'react-bootstrap';

export const Chat: FunctionComponent<{ id: string; selectedConversationId: string }> = ({
  selectedConversationId,
  id,
}) => {
  const [text, setText] = useState('');
  const { conversations, setConversations } = useConversations();
  const selectedConversation = conversations.find(
    (conversation) => conversation.conversationId === selectedConversationId,
  );
  console.log('selectedConversation', selectedConversation);
  // const recipientIds = selectedConversation?.recipients?.map((recipient) => recipient.id);

  const addMessageToConversation = ({ selectedConversationId, text, id }) => {
    const newConversation = {
      ...selectedConversation,
      messages: [...selectedConversation?.messages, { senderId: id, text }],
    };
    // Need to remove the old conversation
    const filteredConversations = conversations.filter(
      (conversation) => conversation.conversationId !== selectedConversationId,
    );
    const updatedConversations = [...filteredConversations, newConversation];

    setConversations(updatedConversations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessageToConversation({ selectedConversationId, text, id });
    setText('');
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {/* {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? 'bg-primary text-white' : 'border'
                  }`}
                >
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};
