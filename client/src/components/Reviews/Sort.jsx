import React from 'react';
import API from './ReviewsAPIUtils';
import './RatingsAndReviews.scss';

const Sort = ({getReviews, totalReviews}) => {

  const handleSelected = (event) => {
    getReviews(event.target.value);
  };

  const dropDownList = (
    <select onChange={handleSelected} className="reviews-sort-dropdown">
      <option>relevence</option>
      <option>helpfulness</option>
      <option>newest</option>
    </select>
  );

  return (
    <div id="sort-reviews">{totalReviews} reviews, sorted by {dropDownList}</div>
  );
};

export default Sort;
