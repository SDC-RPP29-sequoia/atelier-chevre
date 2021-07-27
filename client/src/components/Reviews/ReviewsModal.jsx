import React from 'react';

const ReviewsModal = ({closeImage, imageURL}) => {

  return (
    <div id="reviews-fullscreen-image-wrapper">
      <div id="reviews-image-holder">
        <div onClick={() => closeImage()} id="close-image">X</div>
        <div id="ratings-image"><img src={imageURL}></img></div>
      </div>
    </div>
  );
};

export default ReviewsModal;
