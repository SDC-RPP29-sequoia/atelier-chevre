import React from 'react';
import withTracker from './QATrackerHOC';

const QAButtons = (props) => {
  const moreQsClickHandler = (e) => {
    props.moreAnsweredQs(e);
    props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers');
  };

  const addQClickHandler = (e) => {
    props.addQuestion(e);
    props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers');
  };

  return (
    <div className="qa" id="buttons">
      {props.displayMoreAnsweredQs && <button id="more-answered-qs" onClick={moreQsClickHandler}>MORE ANSWERED QUESTIONS</button>}
      <button id="addq" onClick={addQClickHandler}>ADD A QUESTION +</button>
    </div>
  );
};

export {QAButtons as TestableQAButtons};

export default withTracker(QAButtons);