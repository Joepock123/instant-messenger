import React from 'react';

import { Login } from './Login';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Dashboard } from 'components/Dashboard';
import { ContactsProvider } from 'contexts/ContactsProvider';

const PREFIX = 'iMessenger-';

function App() {
  const [id, setId] = useLocalStorage(PREFIX, null);

  return (
    <ContactsProvider>{id ? <Dashboard id={id} /> : <Login setId={setId} />}</ContactsProvider>
  );
}

export default App;
