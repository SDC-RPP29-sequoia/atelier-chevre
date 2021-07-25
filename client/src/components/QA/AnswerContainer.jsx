import React from 'react';

import SignatureHelpfulReport from './SignatureHelpfulReport';

const AnswerContainer = (props) => {
  return (
    <div className="answer-container">
      <div className="answer" key={props.body}><b className="answer-body">A:</b>&nbsp;{props.body}</div>
      <div className="answer-photos">{props.photos.map((photo, i) => {
        return (
          <img src={photo} width="80px" height="60px" key={i} className="answer-photo"></img>
        );
      })}
      </div>
      <SignatureHelpfulReport aName={props.aName} date={props.date} answerHelpful={props.answerHelpful} answer_id={props.answer_id} helpfulness={props.helpfulness} answerReport={props.answerReport}/>
    </div>
  );
};

export default AnswerContainer;