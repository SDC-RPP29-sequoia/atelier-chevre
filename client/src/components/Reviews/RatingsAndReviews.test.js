/**
 * @jest-environment jsdom
 */


import React from 'react';
import { TestRatingsAndReviews } from './RatingsAndReviews';
import { TestNewReviewForm } from './NewReviewForm';
import { TestRatingsBreakdown } from './RatingsBreakdown';
import { TestReviewContent } from './ReviewContent';
import ClickTracker from './ClickTracker';
import ProductBreakdown from './ProductBreakdown';
import Sort from './Sort';
import FilteredStatus from './FilteredStatus';
import FormStars from './FormStars';
import ReviewsModal from './ReviewsModal';
import { shallow, mount } from 'enzyme';

import { currentProductMetaFourChars, currentProductMetaTwoChars, dummyReviews} from './__mockData__/reviewsMockData.js';

describe('Ratings and Reviews component unit tests', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();

  beforeAll(() => {
    wrapper = shallow(<TestRatingsAndReviews handleTrackingClick={handleTrackingClick}/>);
    instance = wrapper.instance();
    instance.setState({
      currentProductReviews: dummyReviews,
      currentProductMeta: currentProductMetaFourChars
    });
  });

  it('should reset the filters when "clear filter" is clicked', () => {
    instance.setState({
      filterReviews: [1, 1, 1, 1, 1],
    });

    instance.clearAllFilters();
    wrapper.update();

    expect(instance.state.filterReviews).toEqual[0, 0, 0, 0, 0];
  });

  it('should return a fixed percentage for the average of reviews in review data', () => {
    expect(instance.getPercentRecommended(currentProductMetaFourChars)).toBe('78');
  });

  it('should average the ratings in all of the reviews', () => {
    expect(instance.getAverageRating(dummyReviews)).toBe('2.9');
  });

  it('should increment the displayed count by 2 on more button click', () => {
    instance.setState({
      displayedReviewsCount: 2
    });
    wrapper.update();
    wrapper.find('.more-reviews-btn').simulate('click', {currentTarget: {className: 'more-reviews-btn'}});
    wrapper.update();
    expect(instance.state.displayedReviewsCount).toBe(4);
  });

  it('should set overflow-y to "hidden" on Add a New Review Click', () => {
    wrapper.find('.add-reviews-btn').simulate('click', {currentTarget: {className: 'add-reviews-btn'}});
    expect(document.getElementsByTagName('body')[0].style.overflowY).toBe('hidden');
  });

  it('should remove overflow-y to "hidden" on Add a New Review Click', () => {
    instance.getReviewData = jest.fn();
    instance.closeForm('close-form');
    wrapper.update();
    expect(document.getElementsByTagName('body')[0].style.overflowY).toBe('');
    expect(instance.getReviewData).toHaveBeenCalled();
  });

  it('should set overflow-y to "hidden" on Open Image Model', () => {
    instance.getReviewData = jest.fn();
    instance.displayImage('img-url');
    wrapper.update();
    expect(document.getElementsByTagName('body')[0].style.overflowY).toBe('hidden');
    expect(instance.state.imageURL).toBe('img-url');
  });

  it('should remove overflow-y to "hidden" on closing image modal', () => {
    instance.getReviewData = jest.fn();
    instance.closeImage('close-image');
    wrapper.update();
    expect(document.getElementsByTagName('body')[0].style.overflowY).toBe('');
    expect(instance.state.imageURL).toBe('');
  });


});


describe('Product Breakdown component unit tests', () => {
  it('renders 4 divs when given 4 characteristics', () => {
    const Breakdown = ClickTracker(ProductBreakdown);
    const wrapper = mount(<Breakdown currentProductMeta={currentProductMetaFourChars}/>);
    expect(wrapper.find('.breakdown-scale')).toHaveLength(4);
  });

  it('renders 2 divs when given 2 characteristics', () => {
    const Breakdown = ClickTracker(ProductBreakdown);

    const wrapper = mount(<Breakdown currentProductMeta={currentProductMetaTwoChars}/>);
    expect(wrapper.find('.breakdown-scale')).toHaveLength(2);
  });
});

describe('Sort component unit tests', () => {
  it('should render the dropdown box', () => {
    const wrapper = mount(<Sort/>);
    expect(wrapper.find('.reviews-sort-dropdown')).toHaveLength(1);
  });

  it('should get new reviews on changing selected value', () => {
    const getReviewData = jest.fn();

    const wrapper = mount(<Sort getReviewData={getReviewData}/>);
    const dropDown = wrapper.find('.reviews-sort-dropdown');
    dropDown.simulate('change', {target: {value: 'helpful'}});
    expect(getReviewData).toHaveBeenCalled();
  });
});

describe('Filtered Status unit tests', () => {
  const clearAllFilters = jest.fn();
  const filterReviews = [0, 1, 0, 0, 0];

  it('should render correct number of divs for star numbers are filtered', () => {
    const wrapper = shallow(<FilteredStatus filterReviews={filterReviews} clearAllFilters={clearAllFilters}/>);
    expect(wrapper.find('.filter-title')).toHaveLength(1);
  });

  it('should invoke clearAllFilters when the link is clicked', () => {
    const wrapper = mount(<FilteredStatus filterReviews={filterReviews} clearAllFilters={clearAllFilters}/>);
    wrapper.find('.clear-filters').simulate('click');
    expect(clearAllFilters).toHaveBeenCalled();
  });
});

describe('Filtered Status unit tests', () => {
  const handleStarReviewClick = jest.fn();

  it('should render the correct text for the given rating', () => {
    let rating = 1;
    let wrapper = mount(<FormStars rating={rating} handleStarReviewClick={handleStarReviewClick}/>);
    let starText = wrapper.find('.form-stars-text');
    expect(starText.text()).toEqual('1 star - “Poor”');

    rating = 2;
    wrapper = mount(<FormStars rating={rating} handleStarReviewClick={handleStarReviewClick}/>);
    starText = wrapper.find('.form-stars-text');
    expect(starText.text()).toEqual('2 stars - “Fair”');

    rating = 3;
    wrapper = mount(<FormStars rating={rating} handleStarReviewClick={handleStarReviewClick}/>);
    starText = wrapper.find('.form-stars-text');
    expect(starText.text()).toEqual('3 stars - “Average”');

    rating = 4;
    wrapper = mount(<FormStars rating={rating} handleStarReviewClick={handleStarReviewClick}/>);
    starText = wrapper.find('.form-stars-text');
    expect(starText.text()).toEqual('4 stars - “Good”');

    rating = 5;
    wrapper = mount(<FormStars rating={rating} handleStarReviewClick={handleStarReviewClick}/>);
    starText = wrapper.find('.form-stars-text');
    expect(starText.text()).toEqual('5 stars - “Great”');
  });

  it('should invoke handleStarReviewClick when clicked', () => {
    const wrapper = shallow(<FormStars rating={3} handleStarReviewClick={handleStarReviewClick}/>);
    const label = wrapper.find('.form-star-3');
    label.simulate('click');
    expect(handleStarReviewClick).toHaveBeenCalled();
  });
});

describe('New Review Form component', () => {
  const handleTrackingClick = jest.fn();

  let wrapper, instance;
  beforeAll(() => {
    wrapper = shallow(<TestNewReviewForm currentProductMeta={currentProductMetaFourChars} handleTrackingClick={handleTrackingClick}/>);
    instance = wrapper.instance();
  });

  it('should render size div', () => {
    expect(wrapper.find('#review-size')).toHaveLength(1);
  });

  it('should render width div', () => {
    expect(wrapper.find('#review-width')).toHaveLength(1);
  });
  it('should render comfort div', () => {
    expect(wrapper.find('#review-comfort')).toHaveLength(1);
  });
  it('should render quality div', () => {
    expect(wrapper.find('#review-quality')).toHaveLength(1);
  });

  it('should invoke the submit handler when clicking the submit button', () => {
    instance.handleSubmit = jest.fn();
    wrapper.find('.submit-review').simulate('click', {currentTarget: {className: 'submit-review'}});
    expect(instance.handleSubmit).toHaveBeenCalled();
  });

  it('should return false when submitting a blank form', () => {
    expect(instance.validateForm(['Fit'])).toBe(false);
  });

  it('should validate and email address', () => {
    expect(instance.validateEmail('a@b.com')).toBe(true);
    expect(instance.validateEmail('a@b')).toBe(false);
  });
});

describe('Ratings Breakdown component', () => {
  const handleTrackingClick = jest.fn();

  let wrapper, instance;
  beforeAll(() => {
    wrapper = shallow(<TestRatingsBreakdown
      totalReviews={dummyReviews.length}
      handleTrackingClick={handleTrackingClick}
      percentRecommended={'78'}
      reviews={dummyReviews}
    />);
    instance = wrapper.instance;
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});

describe('ReviewsModal', () => {
  const closeImage = jest.fn();
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<ReviewsModal closeImage={closeImage} imageURL={'url'}/>);
  });

  it('should render a fullscreen image div', () => {
    expect(wrapper.find('#reviews-fullscreen-image-wrapper')).toHaveLength(1);
  });

  it('should invoke closeImage when X is clicked', () => {
    wrapper.find('#reviews-fullscreen-image-wrapper').simulate('click', {target: {id: 'reviews-fullscreen-image-wrapper'}});
    expect(closeImage).toHaveBeenCalled();
  });
});

describe('Review Content component', () => {
  const handleTrackingClick = jest.fn();
  const handleHelpfulClick = jest.fn();
  const handleReportClick = jest.fn();
  const displayImage = jest.fn();

  let wrapper, instance;

  beforeAll(() => {
    wrapper = shallow(<TestReviewContent
      handleTrackingClick={handleTrackingClick}
      handleHelpfulClick={handleHelpfulClick}
      handleReportClick={handleReportClick}
      displayImage={displayImage}
      review={dummyReviews[0]}
    />);
    instance = wrapper.instance();
  });

  it('should change display condensed review state to false when Show more is clicked', () => {
    instance.handleShowMoreClick();
    wrapper.update();
    expect(instance.state.displayCondensedReview).toBe(false);
  });

  it('should invoke handlehelpfulclick when Helpful is clicked', () => {
    wrapper.find('.review-helpful').simulate('click', {currentTarget: {className: 'review-helpful'}});
    expect(handleHelpfulClick).toHaveBeenCalled();
  });

  it('should invoke handlehelpfulclick when Helpful is clicked', () => {
    wrapper.find('.review-report').simulate('click', {currentTarget: {className: 'review-report'}});
    expect(handleReportClick).toHaveBeenCalled();
  });
});
