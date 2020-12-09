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

export const ConversationsProvider = ({ children, id }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationId, setSelectedConversationId] = useState('');

  const value = {
    conversations,
    setConversations,
    selectedConversationId: selectedConversationId,
    setSelectedConversationId: setSelectedConversationId,
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
