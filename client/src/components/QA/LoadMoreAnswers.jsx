import React from 'react';
import withTracker from './QATrackerHOC';

const LoadMoreAnswers = (props) => {
  const clickHandler = (e) => {
    props.loadMoreAnswers(e);
    props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers');
  };

  return (
    <div className="load-more-answers" onClick={clickHandler} question_id={props.question_id} original-length={props.originalLength}><b >LOAD MORE ANSWERS</b></div>
  );
};

export {LoadMoreAnswers as TestableLoadMoreAnswers};

export default withTracker(LoadMoreAnswers);