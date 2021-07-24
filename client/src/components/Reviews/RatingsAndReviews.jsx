import React from 'react';
import './RatingsAndReviews.scss';
import { AiOutlinePlus } from 'react-icons/ai';

import Stars from './Stars';
import Sort from './Sort';
import ReviewContent from './ReviewContent';
import API from './ReviewsAPIUtils';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProductReviews: {},
      currentProductMeta: {},
      displayedReviewsCount: 2
    };
  }

  componentDidMount () {
    // get reviews
    this.getReviews();

    // get meta data

  }

  getReviews () {
    API.getProductReviews(this.props.productId).then(res => {
      this.setState({
        currentProductReviews: res
      });
    });
  }

  getAverageRating ({results}) {
    const averageRating = results.reduce((average, review) => {
      return average + review.rating;
    }, 0) / results.length;

    return averageRating.toFixed(1);
  }

  getPercentRecommended ({results}) {
    const percentRecommended = (results.reduce((recommended, review) => {
      if (review.recommend) {
        return recommended + 1;
      } else {
        return recommended;
      }
    }, 0) / results.length) * 100;

    return percentRecommended.toFixed();
  }


  render () {
    // figure out - only render once data has been returned for a product
    if (this.state.currentProductReviews.results === undefined) {
      return (
        <div></div>
      );
    }

    const averageRating = this.getAverageRating(this.state.currentProductReviews);
    const percentRecommended = this.getPercentRecommended(this.state.currentProductReviews);
    const totalReviews = this.state.currentProductReviews.results.length;
    const displayedReviews = this.state.currentProductReviews.results.slice(0, this.state.displayedReviewsCount);
    const reviewsToDisplay = displayedReviews.map(review => {
      return <ReviewContent key={review.review_id} review={review} />;
    });


    return (
      <div id="reviews-section">
        <div id="review-section-title">RATINGS AND REVIEWS</div>
        <div id="reviews-wrapper">
          <div id="reviews-col1">
            <div id="avg-reviews-container">
              <div className="large-avg-review">{averageRating}</div>
              <div id="avg-stars-container"><Stars average={averageRating} /></div>
            </div>
            <div id="percent-recommended">{percentRecommended}% of reviews recommend this product</div>
          </div>
          <div id="reviews-col2">
            <Sort totalReviews={totalReviews}/>
            {reviewsToDisplay}
            <button className="btn">MORE REVIEWS</button>
            <button className="btn">ADD A REVIEW <span className="plus-icon">+</span></button>
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
