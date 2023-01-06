require('express-async-errors');
const cors = require('cors');
const config = require('./utils/config');
const express = require('express');
const notesRouter = require('./controllers/notes');
const userRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const loginRouter = require('./controllers/login');

const app = express();

const url = `${config.MONGODB_URL}${config.USERNAME}:${config.PASSWORD}${config.MONGODB_URI_END}`;

logger.info('connecting to', url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => console.log('error connecting to MongoDB: ', err.message));

app.use(cors()); // allow cross origin requests
app.use(express.static('build')); // for serving static contents from build folder
app.use(express.json()); // for parsing objects into json
app.use(middleware.requestLogger);

app.use('/api/users', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
