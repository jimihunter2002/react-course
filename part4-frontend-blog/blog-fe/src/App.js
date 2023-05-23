/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import BlogCreate from './components/BlogCreate';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import SuccessNotify from './components/SuccessNotify';
import Togglable from './components/Togglable';
import blogService from './services/blogService';
import loginService from './services/loginService';
import utility from './utilities/utility';

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

  async function fetchBlogs() {
    try {
      const blogList = await blogService.getAll();
      setBlogs(blogList);
    } catch (error) {
      console.log(error);
    }
  }

  // const hook = () => {
  //   blogService
  //     .getAll()
  //     .then(initialBlogs => {
  //       setBlogs(initialBlogs);
  //     })
  //     .catch(err => setErrorNotify(err.response));
  // };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const logoutUser = () => {
    window.localStorage.removeItem('blogUserApp');
    window.location.reload(true);
  };

  const BlogCreateRef = useRef();
  const addBlog = blogObj => {
    try {
      BlogCreateRef.current.toggleVisibility();
      blogService
        .create(blogObj)
        .then(res => {
          setSuccessNotify(
            `a new blog ${blogObj.title}! by ${blogObj.author} added`,
          );
          setTimeout(() => {
            setSuccessNotify(null);
          }, 5000);
          setBlogs(blogs.concat(res));
        })
        .catch(err => {
          setErrorNotify('User unable to create a new blog, check the data');
          setTimeout(() => {
            setErrorNotify(null);
          }, 5000);
        });
    } catch (error) {
      setErrorNotify('Service may not be available check the server');
      setTimeout(() => {
        setErrorNotify(null);
      }, 5000);
    }
  };

  const handleLogin = async loginCredentials => {
    try {
      const user = await loginService.login(loginCredentials);
      window.localStorage.setItem('blogUserApp', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorNotify('wrong credentials');
      setTimeout(() => {
        setErrorNotify(null);
      }, 5000);
    }
  };

  const onUpdateLikes = async (id, blogToUpdate) => {
    try {
      await blogService.update(id, blogToUpdate);
      fetchBlogs();
    } catch (error) {
      //console.log(error);
      setErrorNotify(error);
    }
  };

  const onDeleteBlog = async blog => {
    try {
      await blogService.deleteBlog(blog.id);
      fetchBlogs();
      setSuccessNotify(
        `blog titled "${blog.title}!" by ${blog.author} deleted`,
      );
      setTimeout(() => {
        setSuccessNotify(null);
      }, 5000);
    } catch (error) {
      setErrorNotify(
        'blog cannot be deleted service not available try again later ...',
      );
      setTimeout(() => {
        setErrorNotify(null);
      }, 5000);
    }
  };

  return (
    <div className='App'>
      <div>
        <Notification message={errorNotify} />
        <SuccessNotify message={successNotify} />
      </div>
      {user === null ? (
        <Togglable buttonLabel='log in to application'>
          <LoginForm login={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <h2>Blogs</h2>

          <p>
            {user.name} logged in <button onClick={logoutUser}>logout</button>
          </p>
          <div>
            <Togglable ref={BlogCreateRef} buttonLabel='new note'>
              <BlogCreate createBlog={addBlog} />
            </Togglable>
          </div>
          <br />
          <ul className='blog-list'>
            {utility.blogSort(blogs).map((blog, index) => (
              <Blog
                key={blog.id}
                blog={blog}
                id={`blog-${index}-${blog.id}`}
                onUpdateLikes={onUpdateLikes}
                onDeleteBlog={onDeleteBlog}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
