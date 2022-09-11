import React, { useEffect, useState } from 'react';
import ErrorNotify from './components/ErrorNotify';
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import SuccessNotify from './components/SuccessNotify';
import './index.css';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchText, setSearchText] = useState('');
  const [successNotify, setSuccessNotify] = useState(null);
  const [errorNotify, setErrorNotify] = useState(null);

  const fetchData = () => {
    return personService
      .getAllPersons()
      .then(data => {
        return data;
      })
      .catch(err => {
        setErrorNotify(err.message);
        setTimeout(() => {
          setErrorNotify(null);
        }, 5000);
      });
  };

  console.log(fetchData(), 'DATA');
  const hook = () => {
    personService
      .getAllPersons()
      .then(data => {
        setPersons(data);
      })
      .catch(error => {
        //alert(`${error.message}`);
        setErrorNotify(error.message);
        setTimeout(() => {
          setErrorNotify(null);
        }, 5000);
      });
  };
  useEffect(hook, []);

  const addEntryToPhonebook = event => {
    event.preventDefault();
    const personName = persons.find(person => person.name === newName);
    if (personName !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`,
        )
      ) {
        personService
          .updateEntry(personName.id, { name: newName, number: phoneNumber })
          .then(data => {
            setPersons(
              persons.map(person =>
                person.id !== personName.id ? person : data,
              ),
            );
            setSuccessNotify(`${newName} number updated successfully`);
            setTimeout(() => {
              setSuccessNotify(null);
            }, 5000);
          })
          .catch(error => {
            setErrorNotify(
              `Information of ${newName} has already been removed from server`,
            );
            setTimeout(() => {
              setErrorNotify(null);
            }, 5000);
          });
      }
    } else {
      personService
        .createEntry({ name: newName, number: phoneNumber })
        .then(data => {
          setPersons(persons.concat(data));
          setSuccessNotify(`Added ${newName}`);
          setTimeout(() => {
            setSuccessNotify(null);
          }, 5000);
        })
        .catch(error => {
          //alert(`${error.message}`);
          console.log(error.response.data.error);
          setErrorNotify(error.response.data.error);
          setTimeout(() => {
            setErrorNotify(null);
          }, 5000);
        });
    }

    setNewName('');
    setPhoneNumber('');
  };

  const handlePhoneEntrySearch = event => {
    setSearchText(event.target.value);
    if (event.target.value !== '') {
      fetchData().then(data => {
        setPersons(
          data.filter(person => person.name.includes(event.target.value)),
        );
      });
    } else {
      fetchData().then(data => setPersons(data));
    }
  };

  // const handlePhoneEntrySearch = event => {
  //   const de = event.target.value;
  //   console.log('DE', typeof de, de);
  //   setSearchText(event.target.value);
  //   if (event.target.value !== '') {
  //     const ll = persons.filter(person =>
  //       person.name.includes(event.target.value),
  //     );
  //     console.log('LL', ll, ': seacrh Text: ', event.target.value);
  //     setPersons(ll);
  //   } else {
  //     console.log('ELSE:', event.target.value, ':searchText');
  //     const pp = persons.map(person => person);
  //     console.log(pp, 'pp');
  //     fetchData().then(data => setPersons(data));
  //     //setPersons(persons.map(person => person));
  //   }
  //   // searchText
  //   //   ? setPersons(persons.filter(person => person.name.includes(searchText)))
  //   //   : setPersons(persons.map(person => person));
  // };

  // const handleFilterDelete = event => {
  //   if (event.code === 'Backspace' && !event.target.value) {
  //     setSearchText('');
  //     setPersons(persons.map(person => person));
  //   }
  // };

  const handleNameAdditon = event => {
    setNewName(event.target.value);
  };
  const handlePhoneAdditon = event => {
    setPhoneNumber(event.target.value);
  };

  const deleteHandler = id => {
    const person = persons.find(entry => entry.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deleteEntry(id)
        .then(res => {
          setPersons(persons.filter(item => item.id !== id));
          setSuccessNotify(`Deleted ${person.name} successfully`);
          setTimeout(() => {
            setSuccessNotify(null);
          }, 5000);
        })
        .catch(error => {
          setErrorNotify(error.message);
          setTimeout(() => {
            setErrorNotify(null);
          }, 5000);
        });
    } else {
      console.log('Delete action canceled');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotify message={successNotify} />
      <ErrorNotify message={errorNotify} />
      <Filter
        handlePhoneEntrySearch={handlePhoneEntrySearch}
        searchText={searchText}
        // handleFilterDelete={handleFilterDelete}
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
      {/* <Persons persons={persons} /> */}
      {persons.map((person, index) => (
        <Person
          key={index}
          person={person}
          persons={persons}
          //   deletePerson={() => deleteHandler(person.id)}
          deletePerson={deleteHandler}
        />
      ))}
    </div>
  );
};

export default App;
