import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './style/header.css'
import logo from '../../assets/img/logo-santa-monica.jpg'

const Header: React.FC = () => {
  const [width, setWidth] = useState(0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
  },[width])
  
  const isMobile = width && width <= 500;

  if (isMobile) {
    return <Mobile />
  } else {
    return <Desktop />
  }

  function Mobile() {
    return (
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand className="navbar-brand-mobile" href="/">Espaço Santa Mônica</Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown title="Menu" id="nav-dropdown">
              <NavDropdown.Item  eventKey="1" href="#place-details">Descrição</NavDropdown.Item>
              <NavDropdown.Item  eventKey="2" href="#availability">Disponibilidade</NavDropdown.Item>
              <NavDropdown.Item  eventKey="3" href="#section-price">Preço</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4" href="/">Login</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
    )
  }

  function Desktop() {
    return (
      <Navbar className="navbar-santa-monica" expand="lg" bg="dark" variant="dark">
          <Navbar.Brand className="navbar-brand-desktop" href="/"><img 
              alt="santa-monica-logo"
              className="logo"
              src={logo}
              width="50"
              height="50"
            />Espaço Santa Mônica</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#place-details">Descrição</Nav.Link>
            <Nav.Link href="#availability">Disponibilidade</Nav.Link>
            <Nav.Link href="#availability">Preço</Nav.Link>
          </Nav>
          <Nav className="justify-content-end mr-4">
            <Nav.Link href="/">Login</Nav.Link>
          </Nav>
        </Navbar>
    )
  }
}

export default Header;