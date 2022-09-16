const mongoose = require('mongoose');

//create blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: {
    type: String,
    minLength: 4,
    required: true,
  },
  url: {
    type: String,
    minLength: 9,
    required: true,
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
