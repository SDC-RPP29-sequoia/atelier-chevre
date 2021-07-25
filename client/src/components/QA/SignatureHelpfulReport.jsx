import React from 'react';

const SignatureHelpfulReport = (props) => {
  return (
    <div className="signature-helpful-report">
      <div>by&nbsp;</div>
      <div className="author-date" dangerouslySetInnerHTML={{__html: props.aName}}></div>
      <div>, {props.date} | Helpful?&nbsp;</div>
      <div className="answer-helpful" onClick={props.answerHelpful} answer_id={props.answer_id} clicked="false">Yes&nbsp;({props.helpfulness}) |&nbsp;</div>
      <div className="report-answer" onClick={props.answerReport} answer_id={props.answer_id}>Report</div>
    </div>
  );
};

export default SignatureHelpfulReport;