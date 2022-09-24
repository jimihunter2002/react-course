require('dotenv').config();

const MONGODB_URI_START = process.env.MONGODB_URI_START;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;

const MONGODB_URI_END =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI_END
    : process.env.MONGODB_URI_END;

module.exports = {
  MONGODB_URI_START,
  MONGODB_URI_END,
  USERNAME,
  PASSWORD,
  PORT,
};
