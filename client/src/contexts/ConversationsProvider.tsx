import { useLocalStorage } from 'hooks/useLocalStorage';
import React, { useContext, createContext } from 'react';
import { useContacts } from './ContactsProvider';

type IConversation = {
  selected: boolean;
  recipients: Array<IRecipient>;
};

type IRecipient = {
  name: string;
};

type IConversationsContext = {
  conversations?: Array<IConversation>;
  createConversation: (recipients: Array<IRecipient>) => void;
};

const ConversationsContext = createContext<IConversationsContext>({
  conversations: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createConversation: () => {},
});

export const useConversations = () => {
  return useContext<IConversationsContext>(ConversationsContext);
};

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  // const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  // const socket = useSocket();

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  // const formattedConversations = conversations.map((conversation, index) => {
  //   const recipients = conversation.recipients.map((recipient) => {
  //     const contact = contacts.find((contact) => {
  //       return contact.id === recipient;
  //     });
  //     const name = (contact && contact.name) || recipient;
  //     return { id: recipient, name };
  //   });

  //   const messages = conversation.messages.map((message) => {
  //     const contact = contacts.find((contact) => {
  //       return contact.id === message.sender;
  //     });
  //     const name = (contact && contact.name) || message.sender;
  //     const fromMe = id === message.sender;
  //     return { ...message, senderName: name, fromMe };
  //   });

  //   const selected = index === selectedConversationIndex;
  //   return { ...conversation, messages, recipients, selected };
  // });

  const value = {
    conversations,
    // conversations: formattedConversations,
    createConversation,
  };

  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
};
