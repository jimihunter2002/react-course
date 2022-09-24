require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const MONGODB_URI_END =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI_END
    : process.env.MONGODB_URI_END;

module.exports = {
  PORT,
  MONGODB_URI_END,
  MONGODB_URL,
  USERNAME,
  PASSWORD,
};
