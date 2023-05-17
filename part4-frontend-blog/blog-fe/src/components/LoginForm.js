import React, { useState } from 'react';
import blogService from '../services/blogService';
import loginService from '../services/loginService';
import Notification from './Notification';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('blogUserApp', JSON.stringify(user));
      blogService.setToken(user.token);
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

  const showLoginForm = () => {
    setShowLogin(false);
  };

  const cancelForm = () => {
    setShowLogin(true);
  };
  return (
    <div>
      <Notification message={errorMessage} className='error' />
      {showLogin ? (
        <button onClick={showLoginForm}>log in to application</button>
      ) : (
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
          <input type='button' value='cancel' onClick={cancelForm} />
        </form>
      )}
    </div>
  );
};

export default LoginForm;
