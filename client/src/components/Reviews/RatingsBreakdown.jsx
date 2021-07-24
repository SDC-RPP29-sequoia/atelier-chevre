import React from 'react';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  handleStarsNumberClick (stars) {
    console.log(stars);
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

    let columnOne = [];
    let columnTwo = [];
    let columnThree = [];
    let numberOfStars = '';

    for (let i = 5; i > 0; i--) {
      const percentOfReviews = (reviewCounter[i] / totalReviews) * 100;
      const width = {
        width: `${percentOfReviews}%`
      };
      if (percentOfReviews !== 0) {
        numberOfStars = <div onClick={() => this.handleStarsNumberClick(i)} key={i}><span className="reviews-number-link">{i} Stars</span></div>;
      } else {
        numberOfStars = <div key={i}><span className="reviews-number-nolink">{i} Stars</span></div>;
      }
      columnOne.push(numberOfStars);
      columnTwo.push( <div key={i} className="light-bar"><div style={width}className="dark-bar"></div></div>);
      columnThree.push(<div key={i} className="review-label">{reviewCounter[i]}</div>);
    }

    return (
      <div>
        <div id="ratings-breakdown-wrapper">
          <div className="ratings-breakdown-column">
            {columnOne}
          </div>
          <div className="ratings-breakdown-column">
            {columnTwo}
          </div>
          <div className="ratings-breakdown-column">
            {columnThree}
          </div>
        </div>
        <div id="percent-recommended">{percentRecommended}% of reviews recommend this product</div>
      </div>
    );
  }
}

export default RatingsBreakdown;
