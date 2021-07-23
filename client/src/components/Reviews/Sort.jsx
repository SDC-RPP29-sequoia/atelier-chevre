import React from 'react';
import './RatingsAndReviews.scss';

const Sort = ({totalReviews}) => {

  return (
    <div id="sort-reviews">{totalReviews} reviews, sorted by **dropdownlist**</div>
  );
};

export default Sort;
