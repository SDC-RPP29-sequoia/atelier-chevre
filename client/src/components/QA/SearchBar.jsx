import React from 'react';

const SearchBar = (props) => {
  return (
    <div className="qa" id="search">
      <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={props.handleChange}></input>
    </div>
  );
};

export default SearchBar;