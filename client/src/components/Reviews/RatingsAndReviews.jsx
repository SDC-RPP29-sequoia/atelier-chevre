import React from 'react';
import './RatingsAndReviews.scss';
import { AiOutlinePlus } from 'react-icons/ai';

import Stars from '../Stars/Stars';
import Sort from './Sort';
import ReviewContent from './ReviewContent';
import RatingsBreakdown from './RatingsBreakdown';
import API from './ReviewsAPIUtils';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProductReviews: [],
      currentProductMeta: {},
      displayedReviewsCount: 2
    };

    this.getReviewData = this.getReviewData.bind(this);
  }

  componentDidMount () {
    this.getReviewData('relevent');
  }

  async getReviewData (sortMethod) {
    const reviews = await API.getProductReviews(this.props.productId, sortMethod);
    const reviewsMeta = await API.getProductReviewsMeta(this.props.productId);
    this.setState({
      currentProductReviews: reviews.data.results,
      currentProductMeta: reviewsMeta
    });
  }

  getAverageRating (reviews) {
    const averageRating = reviews.reduce((average, review) => {
      return average + review.rating;
    }, 0) / reviews.length;

    return averageRating.toFixed(1);
  }

  getPercentRecommended (reviews) {
    const { recommended } = this.state.currentProductMeta;
    const total = parseInt(recommended.false) + parseInt(recommended.true);
    const percentRecommended = (recommended.true / total) * 100;

    return percentRecommended.toFixed();
  }

  handleMoreReviewsClick () {
    const newCount = this.state.displayedReviewsCount + 2;
    this.setState({
      displayedReviewsCount: newCount
    });
  }


  render () {
    if (this.state.currentProductReviews.length === 0) {
      return (
        <div id="reviews-section">
          <div id="review-section-title">RATINGS AND REVIEWS</div>
          <div id="reviews-wrapper">
            <div id="reviews-col1"></div>
            <div id="reviews-col2">
              <button className="btn">ADD A REVIEW <span className="plus-icon">+</span></button>
            </div>
          </div>
        </div>
      );
    }

    const averageRating = this.getAverageRating(this.state.currentProductReviews);
    const percentRecommended = this.getPercentRecommended(this.state.currentProductReviews);
    const totalReviews = this.state.currentProductReviews.length;
    const displayedReviews = this.state.currentProductReviews.slice(0, this.state.displayedReviewsCount);
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
            <RatingsBreakdown percentRecommended={percentRecommended} reviews={this.state.currentProductReviews} totalReviews={totalReviews}/>

          </div>
          <div id="reviews-col2">
            <Sort getReviews={this.getReviews} totalReviews={totalReviews}/>
            <div className="review-content-wrapper">
              {reviewsToDisplay}
            </div>
            {this.state.displayedReviewsCount < this.state.currentProductReviews.length &&
              <button className="btn" onClick={() => this.handleMoreReviewsClick()}>MORE REVIEWS</button>
            }
            <button className="btn">ADD A REVIEW <span className="plus-icon">+</span></button>
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
