import React, { FunctionComponent, useRef } from 'react';

import { useConversations } from 'contexts/ConversationsProvider';
import { Chat } from './Chat';
import Sidebar from 'components/Sidebar';

export const Dashboard: FunctionComponent<{ id: string }> = ({ id }) => {
  const idRef = useRef(null);
  const { selectedConversationId } = useConversations();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      <Chat id={id} selectedConversationId={selectedConversationId} />
    </div>
  );
};
