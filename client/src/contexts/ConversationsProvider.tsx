import React, { useContext, createContext, useState, useCallback, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { IConversation } from 'types';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

type IConversationsContext = {
  conversations: Array<IConversation>;
  setConversations?: any;
  selectedConversationId: string;
  setSelectedConversationId?: any;
  createConversation: (selectedContactIds: Array<any>) => void;
  sendMessage: ({}) => void;
  getConversation: (string) => IConversation;
  deleteConversation: (string) => void;
};

const ConversationsContext = createContext<IConversationsContext>({
  conversations: [],
  setConversations: undefined,
  selectedConversationId: undefined,
  setSelectedConversationId: undefined,
  createConversation: undefined,
  sendMessage: undefined,
  getConversation: undefined,
  deleteConversation: undefined,
});

export const useConversations = () => {
  return useContext<IConversationsContext | undefined>(ConversationsContext);
};

export const ConversationsProvider = ({ children, id }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationId, setSelectedConversationId] = useState('');
  const { contacts } = useContacts();
  const { socket } = useSocket();

  const createConversation = (recipients) => {
    const conversationId = uuidV4();
    setConversations([
      ...conversations,
      { conversationId: conversationId, recipients: recipients, messages: [] },
    ]);
    console.log('CONVO CREATED');
  };

  const deleteConversation = (conversationId) => {
    const updatedConversations = conversations.filter(
      (conversation) => conversation.conversationId !== conversationId,
    );
    setConversations(updatedConversations);
  };

  const createConversationWithMessage = (selectedConversationId, recipients, senderId, text) => {
    setConversations([
      ...conversations,
      {
        conversationId: selectedConversationId,
        recipients: recipients,
        messages: [{ senderId, text }],
      },
    ]);
    console.log('CONVO WITH MESSAGE AND EXISITNG CONVOID CREATED');
  };

  const getConversation = (conversationId) => {
    return conversations.find((conversation) => conversation.conversationId === conversationId);
  };

  const addMessageToConversation = ({
    selectedConversationId,
    text,
    senderId,
    recipients,
  }: {
    selectedConversationId: string;
    text: string;
    senderId: string;
    recipients?: Array<string>;
  }) => {
    const oldConversation = conversations.find(
      (conversation) => conversation.conversationId === selectedConversationId,
    );

    if (oldConversation) {
      console.log('CONVERSATION EXISTS. Adding to existing conversation.');
      const updatedConversation = {
        ...oldConversation,
        messages: [...oldConversation.messages, { senderId, text }],
      };
      // Need to remove the old conversation
      const filteredConversations = conversations.filter(
        (conversation) => conversation.conversationId !== selectedConversationId,
      );
      const updatedConversations = [...filteredConversations, updatedConversation];

      setConversations(updatedConversations);
    } else {
      console.log('CONVERSATION DOES NOT EXIST. Creating new conversation.');
      createConversationWithMessage(selectedConversationId, recipients, senderId, text);
    }
  };

  const sendMessage = ({ selectedConversationId, text, senderId }) => {
    const conversation = getConversation(selectedConversationId);
    // Send message to recipients
    socket.emit('sent-message', {
      text,
      recipients: conversation.recipients,
      selectedConversationId,
    });
    // Add message locally
    addMessageToConversation({
      selectedConversationId,
      text,
      senderId,
    });
  };

  useEffect(() => {
    if (socket == null) return;
    console.log('Now listening for received messages');
    // Think this creates a listener and when recieves it fires callback.
    // We don't want to create lots of listeners every time component renders
    socket.on('receive-message', (message) => {
      console.log('Received messge', message);
      addMessageToConversation(message);
    });
    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  const formattedConversations = conversations.map((conversation) => {
    const recipients = conversation?.recipients?.map((recipientId) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipientId;
      });
      const name = (contact && contact.name) || recipientId;
      return { id: recipientId, name };
    });

    const messages = conversation?.messages?.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    return { ...conversation, messages, recipients };
  });

  const value = {
    conversations: formattedConversations,
    setConversations,
    selectedConversationId: selectedConversationId,
    setSelectedConversationId: setSelectedConversationId,
    createConversation,
    sendMessage,
    getConversation,
    deleteConversation,
  };

  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
};

// useEffect(() => {
//   if (socket == null) return;

//   // Think this creates a listener and when recieves it fires callback.
//   // We don't want to create lots of listeners every time component renders
//   socket.on('receive-message', addMessageToConversation);

//   return () => socket.off('receive-message');
//   // Without useCallback this function will change everytime we re-render our component
// }, [socket, addMessageToConversation]);
