import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    noteService.getAll().then(initalNotes => {
      console.log(initalNotes);
      setNotes(initalNotes);
    });
  };

  useEffect(hook, []);

  const addNote = e => {
    e.preventDefault();
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObj).then(response => {
      console.log(response);
      setNotes(notes.concat(response));
      setNewNote('');
    });
  };

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(n => (n.id !== id ? n : response)));
      })
      .catch(err => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} className='error' />
      <div onClick={() => setShowAll(!showAll)}>
        <button>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {/*notes.map((note, index) => <li key={note.id}>{note.content}</li>) */}
        {noteToShow.map((note, index) => (
          <Note
            key={note.id}
            note={note}
            id={`note-${index}-${note.id}`}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
