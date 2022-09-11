//import mongoose from 'mongoose';
const mongoose = require('mongoose');

if (process.argv.length < 0) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  );
  process.exit(1);
}
const password = process.argv[2];
const username = 'jimihunter007';

const url = `mongodb+srv://${username}:${password}@cluster0.pjjgpom.mongodb.net/noteApp?retryWrites=true&w=majority`;

//three steps for creating database app
//1. Create Schema key and data type with mongoose
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

//2 create model with mongoose
const Note = mongoose.model('Note', noteSchema);

//3. use mongoose to connect to DB
mongoose
  .connect(url)
  .then(() => {
    //console.log(result);

    //create note from model
    // const note = new Note({
    //   content: 'Golang is New',
    //   date: new Date(),
    //   important: false,
    // });

    //Fetch objects from MongoDB
    Note.find({ important: { $eq: false } }).then(results => {
      results.forEach(note => {
        console.log(note);
      });
    });

    //return note.save(); //return is very important
  })
  .then(() => {
    console.log('note saved!');
    return mongoose.connection.close(); // close connection
  })
  .catch(err => console.log(err));
