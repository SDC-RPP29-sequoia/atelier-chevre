import React from 'react';

const SignatureHelpfulReport = (props) => {
  return (
    <div className="signature-helpful-report">
      <div>by&nbsp;</div>
      <div className="author-date" dangerouslySetInnerHTML={{__html: props.aName}}></div>
      <div>, {props.date} | Helpful?&nbsp;</div>
      <u className="answer-helpful" onClick={props.markHelpful} answer_id={props.answer_id} clicked="false">Yes</u>
      <div>&nbsp;({props.helpfulness}) |&nbsp;</div>
      <u className="report-answer" onClick={props.report} answer_id={props.answer_id}>Report</u>
    </div>
  );
};

export default SignatureHelpfulReport;