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
          <div>
            <Link to="/sprint">Спринт</Link>
          </div>
          <div>
            <Link to="/audio-game">Аудиовызов</Link>
          </div>
          <div>
            <Link to="/gallows-game">Виселица</Link>
          </div>
          <div>
            <Link to="/savanna-game">Саванна</Link>
          </div>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
