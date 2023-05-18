import React, { useEffect, useState } from 'react';
import noteService from '../services/notes';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [errorMessage, setErrorMessage] = useState(null);

  const loginHook = () => {
    const loggedUserJson = window.localStorage.getItem('loggedNotAppuser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      //setUser(user);
      noteService.setToken(user.token);
    }
  };
  useEffect(loginHook, []);

  const handleLogin = event => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} test-data='login_form'>
        <div>
          <label htmlFor='username'>username </label>
          <input
            name='username'
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            name='password'
            id='password'
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

export default LoginForm;
