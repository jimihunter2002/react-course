import React from 'react';

const Header = ({ id, name }) => {
  return (
    <div>
      <h2 id={`test-${id}`}>{name}</h2>
    </div>
  );
};
export default Header;
