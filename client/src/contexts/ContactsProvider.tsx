import { useLocalStorage } from 'hooks/useLocalStorage';
import React, { useContext, createContext } from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = createContext(null);

// This utility function makes the context available where it is called
export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  const value = { contacts, createContact };

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}
