import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchText, setSearchText] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response.data);
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  const addEntryToPhonebook = event => {
    event.preventDefault();
    const isExist = persons.find(person => person.name === newName);
    isExist
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: phoneNumber }]);

    setNewName('');
    setPhoneNumber('');
  };

  const handlePhoneEntrySearch = event => {
    setSearchText(event.target.value);
    setPersons(persons.filter(person => person.name.includes(searchText)));
  };

  const handleNameAdditon = event => {
    setNewName(event.target.value);
  };
  const handlePhoneAdditon = event => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handlePhoneEntrySearch={handlePhoneEntrySearch}
        searchText={searchText}
      />
      <h3>Add a new</h3>
      <PersonForm
        addEntryToPhonebook={addEntryToPhonebook}
        newName={newName}
        handleNameAdditon={handleNameAdditon}
        handlePhoneAdditon={handlePhoneAdditon}
        phoneNumber={phoneNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
