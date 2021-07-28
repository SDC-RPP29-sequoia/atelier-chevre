import React from 'react';
import { shallow } from 'enzyme';

import QA from './QuestionsAndAnswers';

describe('QA component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QA />);
    expect(wrapper).toBeTruthy();
  });
});