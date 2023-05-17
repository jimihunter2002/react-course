import React, { useEffect, useState } from 'react';
import loginService from '../services/login';
import noteService from '../services/notes';
import Notification from './Notification';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const loginHook = () => {
    const loggedUserJson = window.localStorage.getItem('loggedNotAppuser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      noteService.setToken(user.token);
    }
  };
  useEffect(loginHook, [setUser]);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      //add user info to localstorage
      window.localStorage.setItem('loggedNotAppuser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={errorMessage} className='error' />
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
