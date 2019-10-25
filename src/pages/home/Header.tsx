import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './style/header.css'
import logo from '../../assets/img/logo-santa-monica.jpg'

const Header: React.FC = () => (
  <>
  <Navbar fixed="top" className="navbar-santa-monica" bg="dark" variant="dark">
    <Navbar.Brand className="navbar-brand" href="/"><img 
        alt="santa-monica-logo"
        className="logo"
        src={logo}
        width="50"
        height="50"
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