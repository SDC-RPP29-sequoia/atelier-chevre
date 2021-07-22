import React from 'react';
import Stars from '../client/src/components/Stars.jsx';
import { shallow } from 'enzyme';

describe('Stars component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<Stars />);
    instance = wrapper.instance();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  describe('Methods', () => {
    it('should round an average rating to the nearest .25', () => {
      expect(instance.roundAverage(3.3)).toBe(3.25);
      expect(instance.roundAverage(1.9)).toBe(2);
    });

    it('should convert a rounded average to a percent', () => {
      expect(instance.convertToPercent(3.25)).toBe(65);
      expect(instance.convertToPercent(4)).toBe(80);
    });

    it('should convert adjust percents that end in 5', () => {
      expect(instance.adjustQuarters(15)).toBe(11.75);
      expect(instance.adjustQuarters(25)).toBe(28.25);
    });
  });
});