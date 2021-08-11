import React from 'react';
import withTracker from './QATrackerHOC';

const QAHeader = (props) => {
  return (
    <div className="QA" id="QAHeader" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}>{'QUESTIONS & ANSWERS'}</div>
  );
};

export default withTracker(QAHeader);