import React from 'react';

import withTracker from './QATrackerHOC';

const QHelpfulAddAnswer = (props) => {
  return (
    <div className="qhelpful-addanswer" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>
      <div>Helpful?&nbsp;</div>
      <u className="question-helpful" onClick={props.markHelpful} question_id={props.question_id} clicked="false">Yes</u>
      <div>&nbsp;({props.question_helpfulness}) |&nbsp;</div>
      <u className="add-answer" onClick={props.addAnswer} question_id={props.question_id} question_body={props.question_body}>Add Answer</u>
      <div>&nbsp;|&nbsp;</div>
      <u className="report-question" onClick={props.report} question_id={props.question_id}>Report</u>
    </div>
  );
};

export { QHelpfulAddAnswer as TestableQHelpfulAddAnswer };

export default withTracker(QHelpfulAddAnswer);