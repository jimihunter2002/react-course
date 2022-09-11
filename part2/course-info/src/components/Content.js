import React from 'react';
import Part from './Part';
import Total from './Total';

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

export default Content;
