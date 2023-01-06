require('express-async-errors');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const morgan = require('morgan');
const { error, info } = require('./utils/logger');
const middleware = require('./utils/middleware');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const app = express();

const mongoUrl = `${config.MONGODB_URI_START}${config.USERNAME}:${config.PASSWORD}${config.MONGODB_URI_END}`;
console.log(mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => {
    info('Connected to DB');
  })
  .catch(err => error('Failed to connect to DB', err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// morgan logger
morgan.token('body', req => {
  return JSON.stringify(req.body);
});

//logger middleware
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);
app.use('/api/login', loginRouter);
// app.use(middleware.userExtractor);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
