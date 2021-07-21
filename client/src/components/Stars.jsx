import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import '../reviews.css';

class Stars extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const avgReview = Math.round(this.props.avg / .25) * .25;
    let percent = Math.floor((avgReview / 5) * 100);

    const widthTable = {
      5: '8.5',
      15: '12',
      25: '28.5',
      35: '32',
      45: '48.5',
      55: '52',
      65: '68.5',
      75: '72',
      85: '88.5',
      95: '92'
    };

    for (let key in widthTable) {
      if (percent.toString() === key) {
        percent = widthTable[key];
      }
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