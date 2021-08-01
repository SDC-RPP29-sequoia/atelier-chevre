import React from 'react';

const AnswerModal = (props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn">&times;</span>
        <p>SUBMIT ANSWER</p>
        <div className="subtitle">{props.productName}: {props.questionBody}</div>
        <form id="add-answer">
          <label>Your answer:*&nbsp;</label>
          <textarea id="modal-answer" name="body" maxLength="1000"></textarea>
          <div className="modal-answer-photos">{props.photos.map((photo, i) => {
            return (
              <img src={`http://localhost:3000/photos/${photo.filename}`} width="50px" height="50px" key={i} className="answer-photo-thumbnail"></img>
            );
          })}</div>
          <label>What is your nickname:*&nbsp;</label>
          <input type="text" id="modal-answer-nickname" placeholder="Example: jack543!" name="name" maxLength="60"/>
          <div>(For privacy reasons, do not use your full name or email address)</div>
          <br></br>
          <label>Your email:*&nbsp;</label>
          <input type="text" id="modal-answer-email" placeholder="Example: jack@email.com" name="email" maxLength="60"/>
          <div>(For authentication reasons, you will not be emailed)</div>
          <br></br>
          <label id="modal-photos-label">Upload photos:&nbsp;</label>
          <input type="file" id="modal-photos" name="photos" onChange={props.uploadPhotos}/>
          <button onClick={props.submitAnswer}>Submit answer</button>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;