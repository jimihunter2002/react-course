import React from 'react';

const Blog = ({ blog, id }) => {
  return (
    <li id={id} className='blog'>
      {blog.title}
    </li>
  );
};
export default Blog;
