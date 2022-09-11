import React from 'react';

const Note = ({ note, id }) => {
  return <li id={id}>{note.content}</li>;
};

export default Note;
