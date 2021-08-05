import React from 'react';
import withTracker from './QATrackerHOC';

const AnswerModal = (props) => {
  const clickHandler = (e) => {
    props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers');
    props.openThumbnail(e);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>&times;</span>
        <p>SUBMIT ANSWER</p>
        <div className="subtitle" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>{props.productName}: {props.questionBody}</div>
        <form id="add-answer">
          <label>Your answer:*&nbsp;</label>
          <textarea id="modal-answer" name="body" maxLength="1000" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}></textarea>
          <div className="modal-answer-photos">{props.photos.map((photo, i) => {
            return (
              <img src={photo} width="70px" height="70px" key={i} className="answer-photo-thumbnail" onClick={clickHandler}></img>
            );
          })}</div>
          <label>What is your nickname:*&nbsp;</label>
          <input type="text" id="modal-answer-nickname" placeholder="Example: jack543!" name="name" maxLength="60" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
          <div>(For privacy reasons, do not use your full name or email address)</div>
          <br></br>
          <label>Your email:*&nbsp;</label>
          <input type="text" id="modal-answer-email" placeholder="Example: jack@email.com" name="email" maxLength="60" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
          <div>(For authentication reasons, you will not be emailed)</div>
          <br></br>
          <label id="modal-photos-label">Upload photos:&nbsp;</label>
          <input type="file" multiple id="modal-photos" name="photos" onChange={props.uploadPhotos} onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
          <button onClick={props.submitAnswer}>Submit answer</button>
        </form>
      </div>
    </div>
  );
};

export default withTracker(AnswerModal);