/* eslint-disable no-undef */

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('database cleared...');
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when blogs are saved in db', () => {
  test('returns list in json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /json/);
  }, 100000);

  test('returns all blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('returns id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[1].id).toBeDefined();
  });

  test('returns 0 if likes property is missing', async () => {
    const newBlog = {
      title: 'likes is missing should default to 0',
      author: 'Ajanlekoko Lawal',
      url: 'http://blog.lawal.com/',
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.body.likes).toEqual(0);
  });
});

describe('blogs can be updated', () => {
  test('successfully for blog in database', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updateBlog = {
      ...blogToUpdate,
      title: 'Updated Title: Updated',
      likes: 1,
    };

    //update blog retrieved from db
    const updatedBlogResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateBlog);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(updateBlog).toEqual(updatedBlogResponse.body);
  });
});

describe('viewing a specific blog', () => {
  test('returns a blog with given id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToFetch = blogsAtStart[0];

    const response = await api
      .get(`/api/blogs/${blogToFetch.id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual(blogToFetch);
  });

  test('fails with status code 404 for valid non exist ID', async () => {
    const validNonExistingID = await helper.nonExistingBlogId();
    console.log(validNonExistingID);

    await api.get(`/api/blogs/${validNonExistingID}`).expect(404);
  });
  test('fails with status code 400 for invalid ID', async () => {
    const invalidID = '5a3d5da59070081a82a3445';
    console.log(invalidID);

    await api.get(`/api/blogs/${invalidID}`).expect(400);
  });
});

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const userDetails = {
      username: process.env.TESTUSER,
      password: process.env.SECRET,
    };

    const apiResponse = await api.post('/api/login').send(userDetails);
    const token = apiResponse._body.token;
    const newBlog = {
      title: 'add a new blog',
      author: 'Fullstack Author',
      url: 'http://fullstack.author.com/',
      likes: 1,
    };
    console.log('token: ', token);
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(n => n.title);
    expect(contents).toContain('add a new blog');
  });
  //new tests
  test('does not succeed with bearer token data', async () => {
    const newBlog = {
      title: 'add a new blog',
      author: 'Tinubu Adekunle',
      url: 'http://blog.tinubu.com/',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('returns 400 statu code for creating blog with missing data', async () => {
    const newBlog = {
      author: 'Steve Rhodes',
      url: 'http://blog.tinubu.com/',
      likes: 1,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeed with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    //delete blog from db
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const authors = blogsAtEnd.map(b => b.author);
    expect(authors).not.toContain(blogToDelete.author);
  });

  test('delete blog with non existing id', async () => {
    const id = await helper.nonExistingBlogId();

    await api.delete(`/api/dblogs/${id}`).expect(404);
  });

  test('delete blog with invalid id', async () => {
    const id = '5a3d5da59070081a82a3445';

    await api.delete(`/api/dblogs/${id}`).expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
