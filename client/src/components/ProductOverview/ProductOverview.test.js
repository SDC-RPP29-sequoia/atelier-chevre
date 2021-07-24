import React from 'react';
import ProductOverview from './ProductOverview.jsx';
import { shallow } from 'enzyme';

describe('ProductOverview component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<ProductOverview />);
    instance = wrapper.instance();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});