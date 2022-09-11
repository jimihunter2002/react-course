import React from 'react';

const Filter = props => {
  return (
    <div>
      filter shown with
      <input
        onChange={props.handlePhoneEntrySearch}
        value={props.searchText}
        // onKeyDown={props.handleFilterDelete}
      />
    </div>
  );
};
export default Filter;
