import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import '../reviews.css';

class Stars extends React.Component {
  constructor(props) {
    super(props);
  }

  roundAverage(average) {
    return Math.round(average / .25) * .25;
  }

  convertToPercent(roundedAverage) {
    return Math.floor((roundedAverage / 5) * 100);
  }

  adjustQuarters (quarterPercent) {

    if ( quarterPercent % 20 === 5) {
      quarterPercent += 3.25;
    } else {
      quarterPercent -= 3.25;
    }

    return quarterPercent;

  }

  render () {
    const averageReview = this.roundAverage(this.props.average);
    let percent = this.convertToPercent(averageReview);

    if (percent % 10 === 5) {
      percent = this.adjustQuarters(percent);
    }

    const width = {
      width: `${percent}%`
    };

    return (
      <div className="stars-container">
        <div className="inner-stars-container" style={width}>
          <AiFillStar className="inner-star" />
          <AiFillStar className="inner-star" />
          <AiFillStar className="inner-star" />
          <AiFillStar className="inner-star" />
          <AiFillStar className="inner-star" />
        </div>
        <div className="outer-stars-container">
          <AiOutlineStar className="outer-star"/>
          <AiOutlineStar className="outer-star"/>
          <AiOutlineStar className="outer-star"/>
          <AiOutlineStar className="outer-star"/>
          <AiOutlineStar className="outer-star"/>
        </div>
      </div>
    );
  }
}

export default Stars;