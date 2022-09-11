import React from 'react';
import '../index.css';

const Note = ({ note, id, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <li id={id} className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
