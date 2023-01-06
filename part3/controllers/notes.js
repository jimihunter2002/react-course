const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

// const app = express();
// app.use(express.static('build')); // for serving static contents from build folder
// app.use(express.json()); // for parsing objects into json
// app.use(cors()); // allow cross origin requests

// notesRouter.get('/', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes);
//   });
//   //response.send('<h1>Hello World!</h1>');
// });

//async/ await
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

//fetching a note from DB in the backend
// notesRouter.get('/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).json({ error: 'note did not exist' });
//       }
//     })
//     .catch(err => next(err));
// });

//async/ await get
// notesRouter.get('/:id', async (request, response, next) => {
//   try {
//     const note = await Note.findById(request.params.id);
//     if (note) {
//       response.json(note);
//     } else {
//       response.status(404).json({ error: 'note did not exist' });
//     }
//   } catch (exception) {
//     next(exception);
//   }
// });

// remove trycatch from get request using express-async-errors
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).json({ error: 'note did not exist' });
  }
});

//deleting resource
// notesRouter.delete('/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(note => {
//       if (note) {
//         response.status(204).end();
//       } else {
//         response.status(404).send({ message: 'note did not exist' });
//       }
//     })
//     .catch(err => next(err));
// });

//async/await delete
// notesRouter.delete('/:id', async (request, response, next) => {
//   try {
//     await Note.findByIdAndRemove(request.params.id);
//     response.status(204).end();
//   } catch (exception) {
//     next(exception);
//   }
// });

//remove try catch with express-async-error
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// notesRouter.put('/:id', (req, res, next) => {
//   const body = req.body;

//   const note = {
//     content: body.content,
//     important: body.important,
//   };

//   Note.findByIdAndUpdate(req.params.id, note, {
//     new: true,
//     runValidators: true,
//     context: 'query',
//   })
//     .then(updatedNote => {
//       res.json(updatedNote);
//     })
//     .catch(err => next(err));
// });

//update async await
// notesRouter.put('/:id', async (req, res, next) => {
//   const body = req.body;

//   const note = {
//     content: body.content,
//     important: body.important,
//   };

//   try {
//     const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
//       new: true,
//       runValidators: true,
//       context: 'query',
//     });
//     res.status(202).json(updatedNote);
//   } catch (exception) {
//     next(exception);
//   }
// });

//remove trycatch from async/await update using express-async-errors
notesRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  res.status(202).json(updatedNote);
});

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes);
//   });
// });

// notesRouter.post('/', (request, response, next) => {
//   const body = request.body;
//   if (!body.content) {
//     return response.status(400).json({
//       error: 'content missing',
//     });
//   }

//   const note = Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   note
//     .save()
//     .then(savedNote => {
//       // response.json(note);
//       response.status(201).json(savedNote);
//     })
//     .catch(err => next(err));
// });

//post async/await
// notesRouter.post('/', async (request, response, next) => {
//   const body = request.body;

//   const note = Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   try {
//     const savedNote = await note.save();
//     response.status(201).json(savedNote);
//   } catch (exception) {
//     next(exception);
//   }
// });

//remove trycatch async await for express api call
notesRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  //const user = await User.findById(body.userId);

  const note = Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

// app.use(errorHandler); // this should be the last middleware

module.exports = notesRouter;
