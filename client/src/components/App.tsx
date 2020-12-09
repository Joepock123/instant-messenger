import React from 'react';

import { Login } from './Login';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Dashboard } from 'components/Dashboard';
import { ContactsProvider, useContacts } from 'contexts/ContactsProvider';
import { ConversationsProvider } from 'contexts/ConversationsProvider';
import { SocketProvider } from 'contexts/SocketProvider';

const PREFIX = 'iMessenger-';

function App() {
  const [id, setId] = useLocalStorage(PREFIX, null);

  return (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          {id ? <Dashboard id={id} /> : <Login setId={setId} />}
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
}

export default App;
