import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './menu.module.scss';

const Menu = () => (
  <Navbar bg="dark" variant="dark" expand="md" className={style.menu}>
    <Navbar.Brand className={style.rslang}>
      <Link to="/">Rslang</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Navbar.Text>
          <Link to="/textbook/1">Учебник</Link>
          <Link to="/mini-games">Мини-игры</Link>
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
