import React from 'react';

const NoteForm = ({ addNote, handleNoteChange, newNote }) => {
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default NoteForm;
