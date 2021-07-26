import React from 'react';

const QAButtons = (props) => {
  return (
    <div className="qa" id="buttons">
      <button id="more-answered-qs" onClick={props.moreAnsweredQs}>MORE ANSWERED QUESTIONS</button>
      <button id="addq" onClick={props.addQuestion}>ADD A QUESTION +</button>
    </div>
  );
};

export default QAButtons;