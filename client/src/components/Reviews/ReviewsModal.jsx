import React from 'react';

const ReviewsModal = ({closeImage, imageURL}) => {

  return (
    <div id="reviews-fullscreen-image-wrapper" onClick={(e) => {
      closeImage(e.target.id);
    }}>
      <div id="reviews-image-holder">
        <div id="close-image">X</div>
        <div id="ratings-image"><img src={imageURL}></img></div>
      </div>
    </div>
  );
};

export default ReviewsModal;
