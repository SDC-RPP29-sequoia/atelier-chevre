import React from 'react';
import './RatingsAndReviews.scss';

import Stars from './Stars';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
  }



  render () {


    return (
      <div id="reviews-wrapper">
        <div id="reviews-col1">
          <div>RATINGS AND REVIEWS</div>
          <div id="avg-reviews-container">
            <div className="large-avg-review">3.5</div>
            <div id="avg-stars-container"><Stars average="3.5" /></div>
          </div>
        </div>
        <div id="reviews-col2">

        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;
