import React, { useState } from 'react';

const BlogCreate = ({ createBlog }) => {
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
    createBlog(BlogObject);

    setTitle('');
    setAuthor('');
    setUrl('');
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
