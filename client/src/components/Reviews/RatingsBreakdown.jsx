import React from 'react';
import ClickTracker from './ClickTracker';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reviews, totalReviews, percentRecommended} = this.props;
    const reviewCounter = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    reviews.forEach(review => {
      reviewCounter[review.rating]++;
    });

    let breakdownRow = [];
    let breakdownRows = [];
    let ratingsRow = '';
    let j = 1;

    for (let i = 5; i > 0; i--) {
      const percentOfReviews = (reviewCounter[i] / totalReviews) * 100;
      const width = {
        width: `${percentOfReviews}%`
      };

      breakdownRow.push(<div key={i}><span className="reviews-number">{i} Stars</span></div>);
      breakdownRow.push(<div key={(i) * 6} className="light-bar"><div style={width}className="dark-bar"></div></div>);
      breakdownRow.push(<div key={(i) * 12} className="review-label">{reviewCounter[i]}</div>);

      if (percentOfReviews !== 0) {
        ratingsRow = <div
          onClick={(e) => {
            this.props.handleStarsNumberClick(i);
            this.props.handleTrackingClick(e, e.currentTarget.className);
          }}
          className="ratings-breakdown-row reviews-number-link">{breakdownRow}</div>;
      } else {
        ratingsRow = <div className="ratings-breakdown-row reviews-number-nolink">{breakdownRow}</div>;
      }

      breakdownRows.push(ratingsRow);
      breakdownRow = [];
      j++;
    }

    return (
      <div>
        <div id="ratings-breakdown-wrapper">
          {breakdownRows}
        </div>
        <div id="percent-recommended">{percentRecommended}% of reviews recommend this product</div>
      </div>
    );
  }
}

export default ClickTracker(RatingsBreakdown);
