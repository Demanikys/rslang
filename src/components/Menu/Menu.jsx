import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => (
  <Navbar bg="light" expand="md">
    <Navbar.Brand>
      <Link to="/">Rslang</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to="/audio-game">Аудиовызов</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
