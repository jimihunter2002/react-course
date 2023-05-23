import PropTypes from 'prop-types';
import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>username</label>
          <input
            name='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
