import React from 'react';

const LoadMoreAnswers = (props) => {
  return (
    <div className="load-more-answers" onClick={props.loadMoreAnswers}><b>LOAD MORE ANSWERS</b></div>
  );
};

export default LoadMoreAnswers;