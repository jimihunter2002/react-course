import React, { useState } from 'react';

const Person = props => {
  const [isActive, setIsActive] = useState(false);
  return (
    <li style={{ listStyle: 'none' }}>
      {props.person.name} {props.person.number}{' '}
      <input
        type='button'
        value='delete'
        onClick={() => {
          setIsActive(!isActive);
          props.deletePerson(props.person.id);
        }}
        style={{
          cursor: 'pointer',
          backgroundColor: isActive ? 'blue' : '',
        }}
      />
    </li>
  );
};
export default Person;
