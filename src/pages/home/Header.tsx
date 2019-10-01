import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../../img/logo-santa-monica.jpg'

const Header: React.FC = () => (
  <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand style={{borderRadius: '50%'}} href="/"><img
        src={logo}
        width="40"
        height="40"
        
        className="d-inline-block align-top"
        alt="Santa Monica logo"
      /></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/form">Cadastro</Nav.Link>
      <Nav.Link href="/precos">Preços</Nav.Link>
    </Nav>
  </Navbar>
  </>
)
export default Header;