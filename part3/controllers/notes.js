const notesRouter = require('express').Router();
const Note = require('../models/note');

// const app = express();
// app.use(express.static('build')); // for serving static contents from build folder
// app.use(express.json()); // for parsing objects into json
// app.use(cors()); // allow cross origin requests

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
  //response.send('<h1>Hello World!</h1>');
});

//fetching a note from DB in the backend
notesRouter.get('/:id', (request, response, next) => {
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
notesRouter.delete('/:id', (request, response, next) => {
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

notesRouter.put('/:id', (req, res, next) => {
  const body = req.body;

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

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes);
//   });
// });

notesRouter.post('/', (request, response, next) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

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

// app.use(errorHandler); // this should be the last middleware

module.exports = notesRouter;
