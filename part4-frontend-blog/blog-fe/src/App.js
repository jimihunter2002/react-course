import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import BlogCreate from './components/BlogCreate';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import SuccessNotify from './components/SuccessNotify';
import blogService from './services/blogService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successNotify, setSuccessNotify] = useState(null);
  const [errorNotify, setErrorNotify] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('blogUserApp');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const hook = () => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs);
      })
      .catch(err => setErrorNotify(err.response));
  };

  useEffect(hook, []);

  const logoutUser = () => {
    window.localStorage.removeItem('blogUserApp');
    window.location.reload(true);
  };

  return (
    <div className='App'>
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <div>
            <Notification message={errorNotify} />
            <SuccessNotify message={successNotify} />
          </div>
          <p>
            {user.name} logged in <button onClick={logoutUser}>logout</button>
          </p>
          <div>
            <BlogCreate
              setBlogs={setBlogs}
              blogs={blogs}
              setErrorNotify={setErrorNotify}
              setSuccessNotify={setSuccessNotify}
            />
          </div>
          <br />
          <ul className='blog-list'>
            {blogs.map((blog, index) => (
              <Blog key={blog.id} blog={blog} id={`blog-${index}-${blog.id}`} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
