import { useLocalStorage } from 'hooks/useLocalStorage';
import React, { useContext, createContext } from 'react';

const ContactsContext = createContext({ contacts: [], setContacts: undefined });

// This utility function makes the context available where it is called
export const useContacts = () => {
  return useContext(ContactsContext);
};

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const value = { contacts, setContacts };

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
};
