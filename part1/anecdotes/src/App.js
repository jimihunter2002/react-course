import React, { useState } from 'react';

const Header = ({ text, id }) => {
  return (
    <div id={id}>
      <h1>{text}</h1>
    </div>
  );
};

const Display = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  //create an array and fill it with 0
  const arr = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(arr);

  const genereateAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7));
  };
  const onVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const mostVoted = () => Math.max(...votes);
  const mostVotedIndex = () => votes.indexOf(mostVoted());
  console.log('mostVoted', mostVoted());
  console.log('mostVotedIndex', mostVotedIndex());

  return (
    <div>
      <Header text='Anecdote of the day' id='app-header' />
      <Display text={anecdotes[selected]} />
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={onVote}>vote</button>
        <button onClick={genereateAnecdote}>next anecdote</button>
      </div>
      <Header text='Anecdote with most votes' id='id-highest-anecdote' />
      {mostVoted() === 0 ? (
        <div>Click the vote button above to start the application</div>
      ) : (
        <div>
          <Display text={anecdotes[mostVotedIndex()]} />
          <p>has {mostVoted()} votes</p>
        </div>
      )}
    </div>
  );
};

export default App;
