import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
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
        <Link to="/audio-game">Аудиовызов</Link>
        <Link to="/gallows-game">Виселица</Link>
        <Link to="/savanna-game">Саванна</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
