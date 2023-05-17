import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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

  // const handleLogin = async event => {
  //   event.preventDefault();
  //   //console.log('logging in with ', username, password);
  //   try {
  //     const user = await loginService.login({ username, password });
  //     setUser(user);
  //     setUsername('');
  //     setPassword('');
  //   } catch (exception) {
  //     setErrorMessage('wrong credentials');
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //   }
  // };

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

  //auxillary functions for rendering form based on conditions
  // const loginForm = () => (
  //   <form onSubmit={handleLogin} test-data='login_form'>
  //     <div>
  //       <label htmlFor='username'>username </label>
  //       <input
  //         name='username'
  //         id='username'
  //         type='text'
  //         value={username}
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor='password'>password</label>
  //       <input
  //         name='password'
  //         id='password'
  //         type='password'
  //         value={password}
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>

  //     <button type='submit'>login</button>
  //   </form>
  // );
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type='submit'>save</button>
    </form>
  );

  const logoutUser = () => {
    console.log('USER: ', user);
    window.localStorage.removeItem('loggedNotAppuser');
    window.location.reload(true);
  };

  const logoutButton = () => (
    <div>
      <button onClick={logoutUser}>logout</button>
    </div>
  );

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} className='error' />

      {/* login form */}
      {/*user === null && loginForm() conditional rendering
      Below state was passed from parent to child component and manipulated at the child
      level setUser
      */}
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      {/* {user === null && <LoginForm setUser={setUser} />} */}

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
      <br />
      {user !== null && logoutButton()}

      <Footer />
    </div>
  );
};

export default App;
