import React from 'react';

import withTracker from './QATrackerHOC';

const SearchBar = (props) => {
  return (
    <div className="qa" id="search" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}>
      <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={props.handleChange} ></input>
    </div>
  );
};

export { SearchBar as TestableSearchBar };

export default withTracker(SearchBar);