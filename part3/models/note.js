require('dotenv').config();
const mongoose = require('mongoose');

// console.log(process.env.MONGODB_URL, 'FFF');
// const mongoUrlStart = process.env.MONGODB_URL;
// const username = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const mongoUrlEnd = process.env.MONGODB_URI_END;

// const url = `${mongoUrlStart}${username}:${password}${mongoUrlEnd}`;

// console.log('connecting to ', url);

// mongoose
//   .connect(url)
//   .then(() => {
//     console.log('connected to MongoDB');
//   })
//   .catch(err => console.log('error connecting to MongoDB: ', err.message));

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

// schema validation
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

//transform response to remove _id to id
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
