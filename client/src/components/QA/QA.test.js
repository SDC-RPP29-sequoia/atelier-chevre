/**
 * @jest-environment jsdom
*/

import React from 'react';
import { shallow, mount } from 'enzyme';

import { TestableQuestionsAndAnswers } from './QuestionsAndAnswers';
import { TestableQAHeader } from './QAHeader';
import { TestableSearchBar } from './SearchBar';
import { TestableQAList } from './QAList';
import { TestableQAButtons } from './QAButtons';
import { TestableAnswerModal } from './AnswerModal';
import { TestableQuestionModal } from './QuestionModal';
import { TestableAnswerContainer } from './AnswerContainer';
import { TestableLoadMoreAnswers } from './LoadMoreAnswers';
import { TestableQHelpfulAddAnswer } from './QHelpfulAddAnswer';
import { TestableSignatureHelpfulReport } from './SignatureHelpfulReport';
import QATrackerHOC from './QATrackerHOC';

describe('<QuestionsAndAnswers />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableQuestionsAndAnswers productId="28213"/>);
    instance = wrapper.instance();
  });

  it('<QuestionsAndAnswers /> renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});

describe('<QAHeader />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableQAHeader />);
    instance = wrapper.instance();
  });

  it('<QAHeader /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#QAHeader')).toHaveLength(1);
  });
});

describe('<SearchBar />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableSearchBar />);
    instance = wrapper.instance();
  });

  it('<SearchBar /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#search')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
  });
});

describe('<QAList />', () => {
  let wrapper, instance;

  let mockfilteredQs = [
    {
      'question_id': 213346,
      'question_body': 'Where is this product made?',
      'question_date': '2018-10-04T00:00:00.000Z',
      'asker_name': 'jbilas',
      'question_helpfulness': 21,
      'reported': false,
      'answers': {
        '1992368': {
          'id': 1992368,
          'body': 'China',
          'date': '2018-08-04T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 16,
          'photos': []
        }
      }
    }
  ];

  let mockAnswers = {
    '213346': {
      'data': [
        {
          'id': 1992383,
          'body': 'Michigan',
          'date': '2018-01-24T00:00:00.000Z',
          'answerer_name': 'iluvbirds',
          'helpfulness': 4,
          'photos': []
        },
        {
          'id': 1992387,
          'body': 'Made locally!',
          'date': '2018-11-24T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 8,
          'photos': []
        }
      ],
      'count': 2
    }
  };

  beforeEach(() => {
    wrapper = shallow(<TestableQAList filteredQs={mockfilteredQs} answers={mockAnswers} />);
    instance = wrapper.instance();
  });

  it('<QAList /> renders all elements provided data', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#qa-list')).toHaveLength(1);
  });

  it('<QAList /> renders provided no data', () => {
    let faultyList = shallow(<TestableQAList />);

    expect(faultyList).toBeTruthy();
    expect(faultyList.find('#noQs')).toHaveLength(1);
  });
});

describe('<QAButtons />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableQAButtons />);
    instance = wrapper.instance();
  });

  it('<QAButtons /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#buttons')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(1);
  });
});

describe('<AnswerModal />', () => {
  let wrapper, instance;
  let mockPhotos = ['photo1', 'photo2', 'photo3'];

  beforeEach(() => {
    wrapper = shallow(<TestableAnswerModal photos={mockPhotos}/>);
    instance = wrapper.instance();
  });

  it('<AnswerModal /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.modal')).toHaveLength(1);
    expect(wrapper.find('.modal-content')).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
  });
});

describe('<QuestionModal />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableQuestionModal />);
    instance = wrapper.instance();
  });

  it('<QuestionModal /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.modal-q')).toHaveLength(1);
    expect(wrapper.find('.modal-content')).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
  });
});

describe('<AnswerContainer />', () => {
  let wrapper, instance;
  let mockPhotos = ['photo1', 'photo2', 'photo3'];

  beforeEach(() => {
    wrapper = shallow(<TestableAnswerContainer photos={mockPhotos}/>);
    instance = wrapper.instance();
  });

  it('<AnswerContainer /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.answer-container')).toHaveLength(1);
  });
});

describe('<LoadMoreAnswers />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableLoadMoreAnswers />);
    instance = wrapper.instance();
  });

  it('<LoadMoreAnswers /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.load-more-answers')).toHaveLength(1);
  });
});

describe('<QHelpfulAddAnswer />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableQHelpfulAddAnswer />);
    instance = wrapper.instance();
  });

  it('<QHelpfulAddAnswer /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.qhelpful-addanswer')).toHaveLength(1);
    expect(wrapper.find('.question-helpful')).toHaveLength(1);
    expect(wrapper.find('.add-answer')).toHaveLength(1);
    expect(wrapper.find('.report-question')).toHaveLength(1);
  });
});

describe('<SignatureHelpfulReport />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableSignatureHelpfulReport />);
    instance = wrapper.instance();
  });

  it('<SignatureHelpfulReport /> renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.signature-helpful-report')).toHaveLength(1);
    expect(wrapper.find('.author-date')).toHaveLength(1);
    expect(wrapper.find('.answer-helpful')).toHaveLength(1);
    expect(wrapper.find('.report-answer')).toHaveLength(1);
  });
});

describe('<QATrackerHOC />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<QATrackerHOC />);
    instance = wrapper.instance();
  });

  it('<QATrackerHOC /> renders', () => {
    expect(wrapper).toBeTruthy();
  });
});