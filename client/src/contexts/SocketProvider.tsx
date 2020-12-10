import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type ISocketContext = {
  socket: any;
};

// @ts-ignore
const SocketContext = React.createContext<ISocketContext | undefined>(undefined);

// This utility function makes the context available where it is called
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children, id }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    // A new Socket instance is returned for the namespace specified by the pathname in the URL, defaulting to /
    const newSocket = io('http://localhost:5000', { query: { id } });
    // @ts-ignore
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  const value = { socket };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
