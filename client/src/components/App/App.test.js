import React from 'react';
import App from './App.jsx';
import { shallow } from 'enzyme';

describe('App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  });
});
