import React from 'react';
import Stars from '../Stars/Stars';
import './RatingsAndReviews.scss';
import { GrCheckmark } from 'react-icons/gr';

const ReviewContent = ({review}) => {
  const date = new Date(review.date);

  return (
    <div className="review-content">
      <div className="review-content-top-section">
        <Stars average={review.rating}/>
        <span className="review-content-user-and-date">{review.reviewer_name}, {date.toLocaleDateString()}</span>
      </div>
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>
      {review.recommend &&
        <div id="reviews-recommended"><GrCheckmark /> I recommend this product</div>
      }
      {review.response.length > 0 &&
        <div id="reviews-response">
          <div id="response-header">Response:</div>
          <div id="response-content">{review.response}</div>
        </div>
      }
      <div className="helpful">Helpful? Yes({review.helpfulness})  |  Report</div>
    </div>
  );
};

export default ReviewContent;
