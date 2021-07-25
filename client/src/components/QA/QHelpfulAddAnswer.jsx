import React from 'react';

const QHelpfulAddAnswer = (props) => {
  return (
    <div className="qhelpful-addanswer">
      <div>Helpful?&nbsp;</div>
      <div className="question-helpful" onClick={props.questionHelpful} question_id={props.question_id} clicked="false">Yes ({props.question_helpfulness}) |&nbsp;</div>
      <div className="add-answer" onClick={props.addAnswer} question_id={props.question_id} question_body={props.question_body}>Add Answer |&nbsp;</div>
      <div className="report-question" onClick={props.questionReport} question_id={props.question_id}>Report</div>
    </div>
  );
};

export default QHelpfulAddAnswer;