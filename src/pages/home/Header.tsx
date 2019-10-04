import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './style/home.css'
import logo from '../../img/logo-santa-monica.jpg'

const Header: React.FC = () => (
  <>
  <Navbar fixed="top" className="navbar-santa-monica" bg="dark" variant="dark">
    <Navbar.Brand className="navbar-brand" href="/"><img 
        alt="Santa Monica logo"
        src={logo}
        width="40"
        height="40"
        className="d-inline-block align-top"
      />Espaço Santa Mônica</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link className="description" href="#place-details">Descrição</Nav.Link>
      <Nav.Link className="description" href="#availability">Disponibilidade</Nav.Link>
      <Nav.Link className="description" href="#section-price">Preço</Nav.Link>
    </Nav>
  </Navbar>
  </>
)
export default Header;