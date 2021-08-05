import React from 'react';
import withTracker from './QATrackerHOC';

const ThumbnailModal = (props) => {
  return (
    <div className="modal-thumbnail">
      <div className="thumbnail-content">
        <span className="close-btn" onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>&times;</span>
        <img src={props.photo}></img>
      </div>
    </div>
  );
};

export default withTracker(ThumbnailModal);