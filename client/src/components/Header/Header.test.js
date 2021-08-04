import React from 'react';
import { shallow, mount } from 'enzyme';
import { jest } from '@jest/globals';

import Header from './Header.jsx';

describe('ProductOverview component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('renders without crashing', done => {
    expect(wrapper).toBeTruthy();
    done();
  });

  it('renders header parts', done => {
    expect(wrapper.find('#logo')).toBeTruthy();
    expect(wrapper.find('#search-box')).toBeTruthy();
    done();
  });
});