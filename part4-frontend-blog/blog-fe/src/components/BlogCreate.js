import React, { useState } from 'react';
import blogService from '../services/blogService';

const BlogCreate = ({ setBlogs, blogs, setErrorNotify, setSuccessNotify }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = event => {
    event.preventDefault();
    //const user = JSON.parse(window.localStorage.getItem('blogUserApp'));
    const BlogObject = {
      title,
      author,
      url,
    };

    try {
      blogService
        .create(BlogObject)
        .then(res => {
          console.log(res);
          setBlogs(blogs.concat(res));
          setSuccessNotify(`a new blog ${title}! by ${author} added`);
          setTimeout(() => {
            setSuccessNotify(null);
          }, 5000);

          setTitle('');
          setAuthor('');
          setUrl('');
        })
        .catch(err => {
          setErrorNotify(`User unable to create a new blog, check the data`);
          setTimeout(() => {
            setErrorNotify(null);
          }, 5000);
        });
    } catch (error) {
      setErrorNotify(`Service may not be available check the server`);
      setTimeout(() => {
        setErrorNotify(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor='title'>title:</label>
          <input
            name='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input
            name='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <label htmlFor='url'>url:</label>
          <input
            name='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogCreate;
