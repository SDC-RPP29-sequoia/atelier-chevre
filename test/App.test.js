import React from 'react';
import App from '../client/src/components/App.jsx';
import { shallow } from 'enzyme';

import QA from '../client/src/QA/QA.jsx';

describe('App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  });
});