import React from 'react';
import Stars from './Stars';
import './RatingsAndReviews.scss';

const ReviewContent = ({review}) => {
  const date = new Date(review.date);

  console.log(review);
  return (
    <div className="review-content">
      <div className="review-content-top-section">
        <Stars average={review.rating}/>
        <span className="review-content-user-and-date">{review.reviewer_name}, {date.toLocaleDateString()}</span>
      </div>
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>
      <div className="helpful">Helpful | Report</div>
    </div>
  );
};

export default ReviewContent;
