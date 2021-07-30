import React from 'react';

const QuestionModal = (props) => {
  return (
    <div className="modal-q">
      <div className="modal-content">
        <span className="close-btn">&times;</span>
        <p>ASK YOUR QUESTION</p>
        <div className="subtitle">About the {props.productName}</div>
        <form id="add-question">
          <label>Your Question:*&nbsp;</label>
          <textarea id="modal-question" name="body" maxLength="1000"></textarea>
          <label>What is your nickname:*&nbsp;</label>
          <input type="text" id="modal-question-nickname" placeholder="Example: jackson11!" name="name" maxLength="60"/>
          <div>(For privacy reasons, do not use your full name or email address)</div>
          <br></br>
          <label>Your email:*&nbsp;</label>
          <input type="text" id="modal-question-email" placeholder="Why did you like the product or not" name="email" maxLength="60"/>
          <div>(For authentication reasons, you will not be emailed)</div>
          <button onClick={props.submitQuestion}>Submit question</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;