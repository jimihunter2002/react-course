/* eslint-disable no-undef */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');
const helper = require('./test_helper');

beforeEach(async () => {
  await Note.deleteMany({});
  console.log('database cleared...');
  //let noteObject = new Note(helper.initialNotes[0]);
  //await noteObject.save();

  //noteObject = new Note(helper.initialNotes[1]);
  //await noteObject.save();
  //forEach is not good for initializing the database for async await calls
  // helper.initialNotes.forEach(async note => {
  //   let noteObject = new Note(note);
  //   await noteObject.save();
  //   console.log('saved');
  // });
  // console.log('done');

  //instead for non guaranteed execution befor test starts we can
  //use promise.all or for a guaranteed execution use for...of loop
  // const noteObjects = helper.initialNotes.map(note => Note(note));
  // const savedObjectsPromise = noteObjects.map(note => note.save());
  // await Promise.all(savedObjectsPromise);

  //for a guaranteed execution without await
  for (let note of helper.initialNotes) {
    let noteObject = Note(note);
    await noteObject.save();
  }
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map(r => r.content);
  expect(contents).toContain('Browser can execute only Javascript');

  //expect(response.body[1].content).toBe('HTML is Easy');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  //const response = await api.get('/api/notes');
  const notesAtend = await helper.notesInDb();
  expect(notesAtend).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtend.map(n => n.content);
  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };
  await api.post('/api/notes').send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

  expect(resultNote.body).toEqual(processedNoteToView);
});

test('a note can be deleted', async () => {
  console.log('entered test');
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  //console.log(JSON.parse(noteToView), typeof noteToView);
  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map(r => r.content);
  expect(contents).not.toContain(noteToDelete.content);
});

afterAll(async () => {
  await mongoose.connection.close();
});
