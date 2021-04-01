import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './menu.module.scss';

const Menu = () => (
  <Navbar bg="light" expand="md" className={style.menu}>
    <Navbar.Brand>
      <Link to="/">Rslang</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown id="collasible-nav-dropdown" title="Игры">
          <NavDropdown.Item href="/sprint">Спринт</NavDropdown.Item>
          <NavDropdown.Item href="/audio-game">Аудиовызов</NavDropdown.Item>
          <NavDropdown.Item href="/gallows-game">Виселица</NavDropdown.Item>
          <NavDropdown.Item href="/savanna-game">Саванна</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
