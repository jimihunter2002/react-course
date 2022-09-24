/* eslint-disable no-undef */
const listHelpers = require('../utils/list_helpers');
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('list helper', () => {
  test('returns one item', () => {
    expect(listHelpers.dummy()).toBe(1);
  });
  test('returns total likes for blogs', () => {
    expect(listHelpers.totalLikes(blogs)).toBe(36);
  });

  test('returns blog with most likes', () => {
    const data = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    const returnedBlog = listHelpers.favouriteBlog(blogs);
    expect(returnedBlog).toEqual(data);
  });
  test('returns author with most number of blogs', () => {
    const data = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    const mostBlogAuthor = listHelpers.mostBlogs(blogs);
    expect(mostBlogAuthor).toEqual(data);
  });

  test('returns author with most number of blogs lodash', () => {
    const data = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    const _mostBlogAuthor = listHelpers._mostBlogs(blogs);
    expect(_mostBlogAuthor).toEqual(data);
  });

  test('returns author with largest amount of likes', () => {
    const data = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    const mostLikesAuthor = listHelpers.mostLikes(blogs);
    expect(mostLikesAuthor).toEqual(data);
  });

  test('returns author with largest amount of likes by lodash', () => {
    const data = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    const _mostLikesAuthor = listHelpers._mostLikes(blogs);
    expect(_mostLikesAuthor).toEqual(data);
  });
});
