import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import style from './menu.module.scss';

const Menu = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  return (
    <div className={style.navigation}>
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
              {!isAuth ? (
                <>
                  <Navbar.Brand>
                    <Link to="/registration">Sign Up</Link>
                  </Navbar.Brand>
                  <Navbar.Brand>
                    <Link to="/login">Sign In</Link>
                  </Navbar.Brand>
                </>
              ) : (
                <>
                  <Navbar.Brand>
                    {`Hello, ${user.name}`}
                  </Navbar.Brand>
                  <Navbar.Brand>
                    <Link to="/login" onClick={() => dispatch(logout())}>
                      Logout
                    </Link>
                  </Navbar.Brand>
                </>
              )}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
