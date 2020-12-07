import React from 'react';

import { Login } from './Login';
import { useLocalStorage } from 'hooks/useLocalStorage';

const PREFIX = 'iMessenger-';

function App() {
  const [id, setId] = useLocalStorage(PREFIX, null);

  return (
    <>
      {id}
      <Login setId={setId} />
    </>
  );
}

export default App;
