import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
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
        <NavDropdown className={style.dropDown} id="collasible-nav-dropdown" title="Игры">
          <div className={style.dropDownItem}>
            <Link to="/sprint">Спринт</Link>
          </div>
          <div className={style.dropDownItem}>
            <Link to="/audio-game">Аудиовызов</Link>
          </div>
          <div className={style.dropDownItem}>
            <Link to="/gallows-game">Виселица</Link>
          </div>
          <div className={style.dropDownItem}>
            <Link to="/savanna-game">Саванна</Link>
          </div>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
