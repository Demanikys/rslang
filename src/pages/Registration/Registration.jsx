import React, { useState } from 'react';
import { registration } from '../../actions/userActions';
import './Registration.scss';
import { useHistory } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  return (
    <div className='Registration'>
      <form>
        <div className='input-field'>
          <input
            placeholder='Your name (necessarily)'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='email'></label>
        </div>

        <div className='input-field'>
          <input
            placeholder='Email (necessarily)'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='email'></label>
        </div>

        <div className='input-field'>
          <input
            placeholder='Password (necessarily)'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='email'></label>
        </div>

        <button
          onClick={(e) => {
            if (name.length) {
              e.preventDefault();
              registration(email, password, name);
              setName('');
              setEmail('');
              setPassword('');
              history.push('/login');
            }
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
