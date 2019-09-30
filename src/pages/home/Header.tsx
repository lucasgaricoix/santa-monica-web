import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header: React.FC = () => (
  <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Santa Monica</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/form">Cadastro</Nav.Link>
      <Nav.Link href="/precos">Preços</Nav.Link>
    </Nav>
  </Navbar>
  </>
)
export default Header;