import React from 'react';
import './RatingsAndReviews.scss';

import Stars from './Stars';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  getAverageRating (data) {
    let totalRating = 0;
    data.results.forEach(review => {
      totalRating += review.rating;
    });

    return totalRating / data.results.length;
  }


  render () {

    const averageRating = this.getAverageRating(ratingsDummyData);

    return (
      <div id="reviews-wrapper">
        <div id="reviews-col1">
          <div>RATINGS AND REVIEWS</div>
          <div id="avg-reviews-container">
            <div className="large-avg-review">{averageRating}</div>
            <div id="avg-stars-container"><Stars average={averageRating} /></div>
          </div>
        </div>
        <div id="reviews-col2">

        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;


const ratingsDummyData = {
  'product': '28212',
  'page': 0,
  'count': 5,
  'results': [
    {
      'review_id': 407542,
      'rating': 5,
      'summary': 'This product was great!',
      'recommend': true,
      'response': '',
      'body': 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
      'date': '2019-01-01T00:00:00.000Z',
      'reviewer_name': 'funtime',
      'helpfulness': 12,
      'photos': []
    },
    {
      'review_id': 407543,
      'rating': 4,
      'summary': 'This product was ok!',
      'recommend': false,
      'response': '',
      'body': 'I really did not like this product solely because I am tiny and do not fit into it.',
      'date': '2019-01-11T00:00:00.000Z',
      'reviewer_name': 'mymainstreammother',
      'helpfulness': 2,
      'photos': []
    }
  ]
};


