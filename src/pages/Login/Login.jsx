/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="Login">
      <form>
        <div className="input-field">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" />
        </div>

        <div className="input-field">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="email" />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            history.push('/');
            return dispatch(login(email, password));
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
