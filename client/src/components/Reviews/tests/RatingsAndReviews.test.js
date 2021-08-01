import React from 'react';
import RatingsAndReviews from '../RatingsAndReviews.jsx';
import { shallow } from 'enzyme';
import axios from 'axios';

jest.mock('axios');

describe('Ratings and reviews component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<RatingsAndReviews />, { disableLifecycleMethods: true });
    instance = wrapper.instance();
  });

  it('renders a reviews section', () => {
    expect(instance.state.displayedReviewsCount).toBe(2);
    expect(wrapper.find('#reviews-section')).toHaveLength(1);
  });

  it('does not dispaly reviews container when no product has been loaded', () => {
    expect(instance.state.displayedReviewsCount).toBe(2);
    expect(wrapper.find('#avg-reviews-container')).toHaveLength(0);
  });

  describe('Methods', () => {

  });
});