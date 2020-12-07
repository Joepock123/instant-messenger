import React, { FunctionComponent, useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

type Props = { setId: React.Dispatch<(prevState: undefined) => undefined> };

export const Login: FunctionComponent<Props> = ({ setId }) => {
  const idRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setId(idRef.current.value);
  };

  const createNewId = (params) => {
    setId(uuidV4());
  };

  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button onClick={createNewId} variant="secondary">
          Create A New Id
        </Button>
      </Form>
    </Container>
  );
};
