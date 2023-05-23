import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Blog = ({ blog, id, onUpdateLikes, onDeleteBlog }) => {
  const [labelState, setLabelState] = useState(false);
  const [bgColor, setBgColor] = useState('');

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showOrHideDetails = () => {
    setLabelState(!labelState);
  };

  let buttonLabel = labelState ? 'hide' : 'view';

  const addLikes = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 };
    onUpdateLikes(blog.id, blogToUpdate);
  };

  const removeBlog = async () => {
    setBgColor('#429bf5');
    setTimeout(() => {
      let result = window.confirm(
        `Remove Blog You're NOT gonna need it! by ${blog.author}`,
      );
      result ? onDeleteBlog(blog) : setBgColor('');
    }, 0);
  };

  return (
    // <li id={id} className='blog'>
    //   {blog.title}
    // </li>
    <div>
      {buttonLabel === 'view' ? (
        <div id={id} style={blogStyle}>
          {blog.title}
          <span>&nbsp;</span>
          <button onClick={showOrHideDetails}>{buttonLabel}</button>
        </div>
      ) : (
        <div id={id} style={blogStyle}>
          {blog.title}
          <span>&nbsp;</span>
          <button onClick={showOrHideDetails}>{buttonLabel}</button> <br />
          {blog.url}
          <br />
          {blog.likes}
          <span>&nbsp;</span>
          <button onClick={addLikes}>like</button>
          <br />
          {blog.user.name} <br />
          <button
            onClick={removeBlog}
            style={{ cursor: 'pointer', backgroundColor: bgColor }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  onUpdateLikes: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
