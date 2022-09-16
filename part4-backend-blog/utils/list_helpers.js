let _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((prev, curr) => {
    return prev + curr.likes;
  }, 0);
};

const favouriteBlog = blogs => {
  const maxLike = Math.max(...blogs.map(blog => blog.likes));
  const maxLikeBlog = blogs.find(blog => blog.likes === maxLike);
  return {
    title: maxLikeBlog.title,
    author: maxLikeBlog.author,
    likes: maxLikeBlog.likes,
  };
};

const mostBlogs = blogs => {
  const count = {};
  const authorArray = blogs.map(blog => blog.author);
  authorArray.forEach(author => {
    count[author] = (count[author] || 0) + 1;
  });
  const maxNum = Math.max(...Object.values(count));
  const mostBlogKey = Object.keys(count).find(
    author => count[author] === maxNum,
  );
  return {
    author: mostBlogKey,
    blogs: maxNum,
  };
};

//lodash
const _mostBlogs = blogs => {
  const authorCountsObj = _.countBy(blogs, 'author');
  const maxNum = _.max(_.values(authorCountsObj));
  const mostBlogKey = _.find(
    _.keys(authorCountsObj),
    author => authorCountsObj[author] === maxNum,
  );
  return {
    author: mostBlogKey,
    blogs: maxNum,
  };
};

const mostLikes = blogs => {
  const count = {};
  const authors = [...new Set(blogs.map(blog => blog.author))];
  authors.forEach(author => {
    let likes = blogs
      .filter(blog => blog.author === author)
      .reduce((prev, curr) => prev + curr.likes, 0);
    count[author] = likes;
  });
  const maxLikes = Math.max(...Object.values(count));
  const authorWithMaxLikes = Object.keys(count).find(
    author => count[author] === maxLikes,
  );
  return {
    author: authorWithMaxLikes,
    likes: maxLikes,
  };
};

const _mostLikes = blogs => {
  const count = {};

  const uniqueAuthors = _.map(_.uniqBy(blogs, 'author'), blog => blog.author);
  _.forEach(uniqueAuthors, author => {
    let likes = _.reduce(
      _.filter(blogs, blog => blog.author === author),
      (curr, prev) => {
        return curr + prev.likes;
      },
      0,
    );
    count[author] = likes;
  });
  const maxLikes = _.max(_.values(count));
  const authorWithMaxLikes = _.find(
    _.keys(count),
    author => count[author] === maxLikes,
  );

  return {
    author: authorWithMaxLikes,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  _mostBlogs,
  _mostLikes,
};
