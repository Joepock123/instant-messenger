import { useLocalStorage } from 'hooks/useLocalStorage';
import React, { useContext, createContext, useState } from 'react';
import { IConversation } from 'types';
import { useContacts } from './ContactsProvider';

type IConversationsContext = {
  conversations: Array<IConversation>;
  setConversations?: any;
  selectedConversationId: string;
  setSelectedConversationId?: any;
};

const ConversationsContext = createContext<IConversationsContext>({
  conversations: [],
  setConversations: undefined,
  selectedConversationId: 'abc',
  setSelectedConversationId: undefined,
});

export const useConversations = () => {
  return useContext<IConversationsContext | undefined>(ConversationsContext);
};

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationId, setSelectedConversationId] = useState('');
  const { contacts } = useContacts();

  const formattedConversations = conversations.map((conversation) => {
    const recipients = conversation.recipients.map((recipientId) => {
      const contact = contacts.find((contact) => contact.id === recipientId);
      const name = contact?.name || recipientId;
      return { id: recipientId, name };
    });

    // const messages = conversation.messages.map((message) => {
    //   const contact = contacts.find((contact) => {
    //     return contact.id === message.sender;
    //   });
    //   const name = (contact && contact.name) || message.sender;
    //   const fromMe = id === message.sender;
    //   return { ...message, senderName: name, fromMe };
    // });

    // const selected = index === selectedConversationIndex;
    return { ...conversation, recipients };
    // return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    setConversations,
    selectedConversationId: selectedConversationId,
    setSelectedConversationId: setSelectedConversationId,
  };

  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
};
