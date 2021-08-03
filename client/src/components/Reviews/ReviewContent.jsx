import React from 'react';
import Stars from '../Stars/Stars';
import API from './ReviewsAPIUtils';
import './RatingsAndReviews.scss';
import { GrCheckmark } from 'react-icons/gr';

class ReviewContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCondensedReview: true
    };
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);
  }

  handleShowMoreClick () {
    this.setState({
      displayCondensedReview: false
    });
  }

  render () {
    const { review, displayImage, handleHelpfulClick, handleReportClick } = this.props;
    const date = new Date(review.date);
    const photos = review.photos.map(photo => {
      return <img onClick={() => displayImage(photo.url)} className="reviews-thumbnail" key={photo.id} src={photo.url}></img>;
    });

    let reviewBody;
    let condensed = review.body.length > 250 && this.state.displayCondensedReview;

    condensed ? reviewBody = `${review.body.slice(0, 250)}...` : reviewBody = review.body;

    let responseMissing = review.response === null || review.response === '';


    return (
      <div className="review-content">
        <div className="review-content-top-section">
          <Stars average={review.rating}/>
          <span className="review-content-user-and-date">{review.reviewer_name}, {date.toLocaleDateString()}</span>
        </div>
        <div className="review-summary">{review.summary}</div>
        <div className="review-body">{reviewBody}</div>
        {condensed &&
          <div className="review-show-more" onClick={this.handleShowMoreClick}>Show More</div>
        }
        {review.photos.length > 0 &&
          <div className="review-photos-thumbnails">
            {photos}
          </div>
        }
        {review.recommend &&
          <div id="reviews-recommended"><GrCheckmark /> I recommend this product</div>
        }
        {!responseMissing &&
          <div id="reviews-response">
            <div id="response-header">Response:</div>
            <div id="response-content">{review.response}</div>
          </div>
        }
        <div
          className="helpful">Helpful?
          <span
            className="review-content-method"
            onClick={() => handleHelpfulClick(review.review_id)}>Yes</span>
          <span> ({review.helpfulness})</span>
          <span className="review-content-separator">|</span>
          <span
            className="review-content-method review-report"
            onClick={() => handleReportClick(review.review_id)}>Report</span>
        </div>
      </div>
    );
  }
}

export default ReviewContent;
