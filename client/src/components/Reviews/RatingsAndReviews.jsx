import React from 'react';
import './RatingsAndReviews.scss';
import { AiOutlinePlus } from 'react-icons/ai';

import Stars from '../Stars/Stars';
import Sort from './Sort';
import ReviewContent from './ReviewContent';
import RatingsBreakdown from './RatingsBreakdown';
import FilteredStatus from './FilteredStatus';
import ProductBreakdown from './ProductBreakdown';
import API from './ReviewsAPIUtils';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProductReviews: [],
      currentProductMeta: {},
      displayedReviewsCount: 2,
      filterReviews: [0, 0, 0, 0, 0]
    };

    this.getReviewData = this.getReviewData.bind(this);
    this.handleStarsNumberClick = this.handleStarsNumberClick.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
  }

  componentDidMount () {
    this.getReviewData('relevent');
  }

  getReviewsToDisplay(filtered) {
    let reviewHolder = [];
    let reviews, compareLength;

    if (filtered) {
      this.state.currentProductReviews.forEach(review => {
        if (this.state.filterReviews[review.rating - 1]) {
          reviewHolder.push(review);
        }
      });
      reviews = reviewHolder.slice(0, this.state.displayedReviewsCount);
      compareLength = reviewHolder.length;
    } else {
      reviews = this.state.currentProductReviews.slice(0, this.state.displayedReviewsCount);
      compareLength = this.state.currentProductReviews.length;
    }

    return [reviews, compareLength];
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

  clearAllFilters () {
    this.setState({
      filterReviews: [0, 0, 0, 0, 0]
    });
  }

  handleMoreReviewsClick () {
    const newCount = this.state.displayedReviewsCount + 2;
    this.setState({
      displayedReviewsCount: newCount
    });
  }

  handleStarsNumberClick (stars) {
    const filters = [...this.state.filterReviews];
    filters[stars - 1] === 0 ? filters[stars - 1] = 1 : filters[stars - 1] = 0;
    this.setState({
      filterReviews: filters,
      displayedReviewsCount: 2
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
    const filtered = this.state.filterReviews.includes(1);
    const [ displayedReviews, compareLength ] = this.getReviewsToDisplay(filtered);


    let reviewsToDisplay = displayedReviews.map(review => {
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
            <RatingsBreakdown handleStarsNumberClick={this.handleStarsNumberClick} percentRecommended={percentRecommended} reviews={this.state.currentProductReviews} totalReviews={totalReviews}/>
            {filtered === true &&
              <FilteredStatus filterReviews={this.state.filterReviews} clearAllFilters={this.clearAllFilters}/>
            }
            <ProductBreakdown currentProductMeta={this.state.currentProductMeta}/>
          </div>
          <div id="reviews-col2">
            <Sort getReviewData={this.getReviewData} totalReviews={totalReviews}/>
            <div className="review-content-wrapper">
              {reviewsToDisplay}
            </div>
            {this.state.displayedReviewsCount < compareLength &&
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
