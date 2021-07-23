import React from 'react';

const QAHeader = (props) => {
  return (
    <div className="QA" id="QAHeader">{'QUESTIONS & ANSWERS'} / CURR PROD ID: {props.currProductId}</div>
  );
};

export default QAHeader;