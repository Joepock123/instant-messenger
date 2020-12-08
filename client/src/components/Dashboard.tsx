import Sidebar from 'components/Sidebar';
import React, { FunctionComponent, useRef } from 'react';

export const Dashboard: FunctionComponent<{ id: string }> = ({ id }) => {
  const idRef = useRef(null);

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
    </div>
  );
};
