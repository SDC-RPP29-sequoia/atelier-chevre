import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const FormStars = ({rating, handleStarReviewClick}) => {
  let selectionText = '';

  if (rating === 1) {
    selectionText = <span className="form-stars-text">1 star - “Poor”</span>;
  }
  if (rating === 2) {
    selectionText = <span className="form-stars-text">2 stars - “Fair”</span>;
  }
  if (rating === 3) {
    selectionText = <span className="form-stars-text">3 stars - “Average”</span>;
  }
  if (rating === 4) {
    selectionText = <span className="form-stars-text">4 stars - “Good”</span>;
  }
  if (rating === 5) {
    selectionText = <span className="form-stars-text">5 stars - “Great”</span>;
  }

  const formStars = [...Array(5)].map((star, index) => {
    return <label key={index}>
      <AiFillStar
        size="24"
        color={rating >= index + 1 ? 'goldenrod' : 'white'}
        className={`form-star form-star-${index}`}
        onClick={() => handleStarReviewClick(index + 1)}/>
      <input type="radio" className="form-star-radio"></input>
    </label>;
  });

  return (
    <div id="form-star-wrapper">
      <div>
        {formStars}
      </div>
      {selectionText}
    </div>
  );
};

export default FormStars;
