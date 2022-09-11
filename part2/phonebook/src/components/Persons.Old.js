import React from 'react';
import Person from './Person';

const Persons = props => {
  return (
    <div>
      {props.persons.map((person, index) => (
        <Person
          key={index}
          person={person}
          deletePerrson={() => deleteHandler(person.id)}
        />
      ))}
    </div>
  );
};
export default Persons;
