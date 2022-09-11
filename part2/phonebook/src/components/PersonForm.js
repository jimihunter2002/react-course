import React, { useState } from 'react';

const PersonForm = props => {
  const [isActive, setIsActive] = useState(false);
  const changeColor = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <form onSubmit={props.addEntryToPhonebook}>
        <div>
          name:{' '}
          <input value={props.newName} onChange={props.handleNameAdditon} />
        </div>

        <div>
          number:{' '}
          <input
            value={props.phoneNumber}
            onChange={props.handlePhoneAdditon}
          />
        </div>
        <div>
          <button
            type='submit'
            onClick={changeColor}
            style={{
              backgroundColor: isActive ? 'blue' : '',
              cursor: 'pointer',
            }}
          >
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
