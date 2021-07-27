import React from 'react';
import Stars from '../Stars/Stars';
import API from './ReviewsAPIUtils';
import './RatingsAndReviews.scss';
import { GrCheckmark } from 'react-icons/gr';

const ReviewContent = ({review, displayImage, handleHelpfulClick}) => {
  const date = new Date(review.date);
  const photos = review.photos.map(photo => {
    return <img onClick={() => displayImage(photo.url)} className="reviews-thumbnail" key={photo.id} src={photo.url}></img>;
  });

  return (
    <div className="review-content">
      <div className="review-content-top-section">
        <Stars average={review.rating}/>
        <span className="review-content-user-and-date">{review.reviewer_name}, {date.toLocaleDateString()}</span>
      </div>
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>
      {review.photos.length > 0 &&
        <div className="review-photos-thumbnails">
          {photos}
        </div>
      }
      {review.recommend &&
        <div id="reviews-recommended"><GrCheckmark /> I recommend this product</div>
      }
      {review.response.length > 0 &&
        <div id="reviews-response">
          <div id="response-header">Response:</div>
          <div id="response-content">{review.response}</div>
        </div>
      }
      <div className="helpful">Helpful? <span onClick={() => handleHelpfulClick(review.review_id)}>Yes({review.helpfulness})</span>  |  Report</div>
    </div>
  );
};

export default ReviewContent;
