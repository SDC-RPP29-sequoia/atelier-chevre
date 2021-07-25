import React from 'react';

const SearchBar = (props) => {
  return (
    <div className="qa" id="search">
      <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={props.handleChange}></input>
      <img src="https://image.flaticon.com/icons/png/512/61/61088.png"></img>
    </div>
  );
};

export default SearchBar;