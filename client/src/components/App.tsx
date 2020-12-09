import React from 'react';

import { Login } from './Login';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Dashboard } from 'components/Dashboard';
import { ContactsProvider, useContacts } from 'contexts/ContactsProvider';
import { ConversationsProvider } from 'contexts/ConversationsProvider';

const PREFIX = 'iMessenger-';

function App() {
  const [id, setId] = useLocalStorage(PREFIX, null);

  return (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        {id ? <Dashboard id={id} /> : <Login setId={setId} />}
      </ConversationsProvider>
    </ContactsProvider>
  );
}

export default App;
