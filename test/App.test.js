import React from 'react';
import App from '../client/src/components/App.jsx';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

enzyme.configure({adapter: new Adapter})

describe('first section', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  })
})
