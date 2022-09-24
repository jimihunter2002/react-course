const http = require('http');
const config = require('./utils/config');
const app = require('./app');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

process.on('SIGINT', () => {
  logger.info('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(1);
});
