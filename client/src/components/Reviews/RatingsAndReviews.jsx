import React from 'react';
import './RatingsAndReviews.scss';

import Stars from './Stars';
import Sort from './Sort';
import ReviewContent from './ReviewContent';

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

    // get meta data
  }

  getAverageRating ({results}) {
    const averageRating = results.reduce((average, review) => {
      return average + review.rating;
    }, 0) / results.length;

    return averageRating;
  }

  getPercentRecommended ({results}) {
    const percentRecommended = (results.reduce((recommended, review) => {
      if (review.recommend) {
        return recommended + 1;
      } else {
        return recommended;
      }
    }, 0) / results.length) * 100;

    return percentRecommended;
  }


  render () {
    // figure out - only render once data has been returned for a product

    const averageRating = this.getAverageRating(ratingsDummyData);
    const percentRecommended = this.getPercentRecommended(ratingsDummyData);
    const totalReviews = ratingsDummyData.results.length;

    const displayedReviews = ratingsDummyData.results.slice(0, this.state.displayedReviewsCount);

    const reviewsToDisplay = displayedReviews.map(review => {
      return <ReviewContent review={review} />;
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
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;


const ratingsDummyData = {
  'product': '28213',
  'page': 0,
  'count': 5,
  'results': [
    {
      'review_id': 407544,
      'rating': 4,
      'summary': 'I am liking these glasses',
      'recommend': true,
      'response': 'Glad you\'re enjoying the product!',
      'body': 'They are very dark. But that\'s good because I\'m in very sunny spots',
      'date': '2019-06-23T00:00:00.000Z',
      'reviewer_name': 'bigbrotherbenjamin',
      'helpfulness': 7,
      'photos': []
    },
    {
      'review_id': 407546,
      'rating': 3,
      'summary': 'I\'m enjoying wearing these shades',
      'recommend': true,
      'response': '',
      'body': 'Comfortable and practical.',
      'date': '2019-04-14T00:00:00.000Z',
      'reviewer_name': 'shortandsweeet',
      'helpfulness': 5,
      'photos': [
        {
          'id': 731061,
          'url': 'https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
        },
        {
          'id': 731062,
          'url': 'https://images.unsplash.com/photo-1561693532-9ff59442a7db?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
        },
        {
          'id': 731063,
          'url': 'https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
        }
      ]
    },
    {
      'review_id': 407545,
      'rating': 4,
      'summary': 'They look good on me',
      'recommend': true,
      'response': '',
      'body': 'I so stylish and just my aesthetic.',
      'date': '2019-03-12T00:00:00.000Z',
      'reviewer_name': 'fashionperson',
      'helpfulness': 1,
      'photos': []
    },
    {
      'review_id': 407548,
      'rating': 2,
      'summary': 'This product was ok!',
      'recommend': false,
      'response': '',
      'body': 'They\'re fine but I wouldn\'t buy again.',
      'date': '2019-05-23T00:00:00.000Z',
      'reviewer_name': 'anyone',
      'helpfulness': 0,
      'photos': []
    },
    {
      'review_id': 407547,
      'rating': 5,
      'summary': 'I\'m not a fan!',
      'recommend': false,
      'response': 'Sorry to hear. Is there anything in particular you don\'t like?',
      'body': 'I don\'t like them',
      'date': '2019-06-16T00:00:00.000Z',
      'reviewer_name': 'negativity',
      'helpfulness': 0,
      'photos': []
    }
  ]
};


