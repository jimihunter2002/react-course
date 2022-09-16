const cors = require('cors');
require('dotenv').config();
const express = require('express');
const Note = require('./models/note');

// const username = 'jimihunter007';
// const password = 'JIMmy210';

// const url = `mongodb+srv://${username}:${password}@cluster0.pjjgpom.mongodb.net/noteApp?retryWrites=true&w=majority`;

//mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

//transform the toJSON of mongoose
// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

//2 create model with mongoose
//const Note = mongoose.model('Note', noteSchema);

// let notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     date: '2019-05-30T17:30:31.098Z',
//     important: false,
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false,
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true,
//   },
//   {
//     content: 'A new data added',
//     date: '2022-08-30T08:03:46.781Z',
//     important: true,
//     id: 4,
//   },
//   {
//     content: 'This is test',
//     date: '2022-08-31T13:02:05.679Z',
//     important: false,
//     id: 5,
//   },
// ];
const app = express();
app.use(express.static('build')); // for serving static contents from build folder
app.use(express.json()); // for parsing objects into json
app.use(cors()); // allow cross origin requests

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

//fetching a single note
// app.get('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find(note => note.id === id);
//   note
//     ? response.json(note)
//     : response.status(404).send(`Note with id: ${id} is not found`);
// });

//fetching a note from DB in the backend
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).json({ error: 'note did not exist' });
      }
    })
    .catch(err => next(err));
});

//deleting resource
app.delete('/api/notes/:id', (request, response, next) => {
  // const id = Number(request.params.id);
  // const note = notes.find(note => note.id === id);

  // notes = notes.filter(note => note.id !== id);
  // note
  //   ? response.status(204).send(`Note with id: ${id} deleted`)
  //   : response.status(404).send(`No note found with id: ${id}`);
  Note.findByIdAndRemove(request.params.id)
    .then(note => {
      if (note) {
        response.status(204).end();
      } else {
        response.status(404).send({ message: 'note did not exist' });
      }
    })
    .catch(err => next(err));
});

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body;
  console.log(req.body);

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then(updatedNote => {
      res.json(updatedNote);
    })
    .catch(err => next(err));
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
//   return maxId + 1
// }

app.post('/api/notes', (request, response, next) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }
  // const note = {
  //   content: body.content,
  //   important: body.important || false,
  //   date: new Date(),
  //   id: generateId(),
  // };

  // notes = notes.concat(note);
  //console.log(note);
  //add database

  const note = Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then(savedNote => {
      // response.json(note);
      response.json(savedNote);
    })
    .catch(err => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(405).json({ error: err.message });
  }
  next(err);
};
app.use(errorHandler); // this should be the last middleware

// const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
