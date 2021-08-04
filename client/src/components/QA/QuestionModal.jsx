import React from 'react';

import withTracker from './QATrackerHOC';

const QuestionModal = (props) => {
  return (
    <div className="modal-q">
      <div className="modal-content">
        <span className="close-btn" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>&times;</span>
        <p>ASK YOUR QUESTION</p>
        <div className="subtitle" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>About the {props.productName}</div>
        <form id="add-question">
          <label>Your Question:*&nbsp;</label>
          <textarea id="modal-question" name="body" maxLength="1000" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}></textarea>
          <label>What is your nickname:*&nbsp;</label>
          <input type="text" id="modal-question-nickname" placeholder="Example: jackson11!" name="name" maxLength="60" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
          <div>(For privacy reasons, do not use your full name or email address)</div>
          <br></br>
          <label>Your email:*&nbsp;</label>
          <input type="text" id="modal-question-email" placeholder="Why did you like the product or not" name="email" maxLength="60" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
          <div>(For authentication reasons, you will not be emailed)</div>
          <button onClick={props.submitQuestion}>Submit question</button>
        </form>
      </div>
    </div>
  );
};

export { QuestionModal as TestableQuestionModal };

export default withTracker(QuestionModal);