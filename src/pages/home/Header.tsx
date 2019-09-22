import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Header: React.FC = () => (
  <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Santa Monica</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/form">Cadastro</Nav.Link>
      <Nav.Link href="/precos">Preços</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  </>
)
export default Header;