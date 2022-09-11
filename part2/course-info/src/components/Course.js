import React from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({ course }) => {
  return (
    <div>
      <Header id={course.id} name={course.name} />
      <Content course={course} />
    </div>
  );
};

export default Course;
