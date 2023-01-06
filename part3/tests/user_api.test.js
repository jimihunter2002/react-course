/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const app = require('../app');
const supertest = require('supertest');
const User = require('../models/user');
const helper = require('./test_helper');
const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    // const user = new User({
    //   username: 'root',
    //   passwordHash,
    // });
    // await user.save();

    for (let user of helper.initialUsers) {
      user.passwordHash = passwordHash;
      const userObject = User(user);
      await userObject.save();
    }
  });
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'jimi',
      name: 'Jimi Hunter',
      password: 'jimihunter',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper status code if username is taken', async () => {
    const usersAtStart = await helper.usersInDb();
    console.log(usersAtStart);

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'jimihunter',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
