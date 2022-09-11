import React from 'react';
const Part = props => {
  let id = `exercises-${props.exercises}`;
  return (
    <p id={id}>
      {props.name} {props.exercises}
    </p>
  );
};

export default Part;
