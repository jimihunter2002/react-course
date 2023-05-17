import React from 'react';

const Header = props => {
  return (
    <div>
      <h1 test-id='header'>{props.course}</h1>
    </div>
  );
};

const Part = props => {
  let id = `exercises-${props.exercises}`;
  return (
    <p id={id}>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ part, exercises }) => {
  return (
    <div>
      {/* <Part part={props.part1.name} exercises={props.part1.exercises}/>
      <Part part={props.part2.name} exercises={props.part2.exercises}/>
      <Part part={props.part3.name} exercises={props.part3.exercises}/> */}
      <Part part={part} exercises={exercises} />
    </div>
  );
};

const Total = ({ exercisesTotal }) => {
  return (
    <div>
      <p>Number of exercises {exercisesTotal}</p>
    </div>
  );
};

const App = () => {
  // const course = 'Half Stack application development';
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }

  // ]

  const exercisesTotal = course.parts.reduce((acc, inc) => {
    return acc + inc.exercises;
  }, 0);

  return (
    <div id='main-container'>
      <Header course={course.name} />
      {/* <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1}
        exercises2={exercises2} exercises3={exercises3}/> */}
      {course.parts.map(({ name, exercises }, index) => (
        <Content key={index} part={name} exercises={exercises} />
      ))}
      <Total exercisesTotal={exercisesTotal} />

      {/* <Content part1={part1} part2={part2} part3={part3}/> */}
      {/* <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/> */}
    </div>
  );
};

export default App;
