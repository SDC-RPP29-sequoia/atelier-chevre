import React from 'react';

const LoadMoreAnswers = (props) => {
  return (
    <div className="load-more-answers" onClick={props.loadMoreAnswers} question_id={props.question_id} original-length={props.originalLength}><b >LOAD MORE ANSWERS</b></div>
  );
};

export default LoadMoreAnswers;