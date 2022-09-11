import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    axios.get('http://localhost:3001/notes').then(response => {
      setNotes(response.data);
    });
  };

  useEffect(hook, []);

  const addNote = e => {
    e.preventDefault();
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    // setNotes(notes.concat(noteObj));
    setNotes([...notes, noteObj]);
    setNewNote('');
    console.log('button clicked', e.target);
  };

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div onClick={() => setShowAll(!showAll)}>
        <button>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {/*notes.map((note, index) => <li key={note.id}>{note.content}</li>) */}
        {noteToShow.map((note, index) => (
          <Note key={note.id} note={note} id={`note-${index}-${note.id}`} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
