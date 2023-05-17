import React from 'react';

const Header = ({ id, name }) => {
  return (
    <div>
      <h1 id={`test-${id}`}>{name}</h1>
    </div>
  );
};

const Part = props => {
  let id = `exercises-${props.exercises}`;
  return (
    <p id={id}>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const exercisesTotal = course.parts.reduce(
    (prev, curr) => prev + curr.exercises,
    0,
  );

  return (
    <div>
      {course.parts.map(({ name, exercises, id }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
      <Total toalExercises={exercisesTotal} />
    </div>
  );
};

const Total = ({ toalExercises }) => {
  return (
    <div>
      <h3>Total of exercises {toalExercises}</h3>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header id={course.id} name={course.name} />
      <Content course={course} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <div id='main-container'>
      <Course course={course} />
    </div>
  );
};

export default App;
