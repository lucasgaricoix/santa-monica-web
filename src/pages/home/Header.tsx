import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './style/home.css'
import logo from '../../img/logo-santa-monica.jpg'

const Header: React.FC = () => (
  <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/"><img        
        src={logo}
        width="40"
        height="40"
        
        className="logo"
        alt="Santa Monica logo"
      /></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Espaco Santa Monica</Nav.Link>
    </Nav>
  </Navbar>
  </>
)
export default Header;