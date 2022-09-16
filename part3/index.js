// const cors = require('cors');
// require('dotenv').config();
// const express = require('express');
// const Note = require('./models/note');
const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

// const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT;
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
