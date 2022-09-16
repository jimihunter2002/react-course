//import cors from 'cors';
//import express from 'express';
//import mongoose from 'mongoose';
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const username = '';
const password = '';

const url = `mongodb+srv://${username}:${password}@cluster0.pjjgpom.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

//2 create model with mongoose
//const Note = mongoose.model('Note', noteSchema);

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: false,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
  {
    content: 'A new data added',
    date: '2022-08-30T08:03:46.781Z',
    important: true,
    id: 4,
  },
  {
    content: 'This is test',
    date: '2022-08-31T13:02:05.679Z',
    important: false,
    id: 5,
  },
];
const app = express();

app.use(cors()); // allow cross origin requests
app.use(express.json()); // for parsing objects into json
app.use(express.static('build')); // for serving static contents from build folder

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

//fetching a single note
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  note
    ? response.json(note)
    : response.status(404).send(`Note with id: ${id} is not found`);
});

//deleting resource
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);

  notes = notes.filter(note => note.id !== id);
  note
    ? response.status(204).send(`Note with id: ${id} deleted`)
    : response.status(404).send(`No note found with id: ${id}`);
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);
  //console.log(note);
  response.json(note);
});

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
