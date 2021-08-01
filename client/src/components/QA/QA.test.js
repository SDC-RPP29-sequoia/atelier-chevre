import React from 'react';
import { shallow } from 'enzyme';

import QuestionsAndAnswers from './QuestionsAndAnswers';
import QAHeader from './QAHeader';
import SearchBar from './SearchBar';
import QAList from './QAList';
import QAButtons from './QAButtons';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';
import AnswerContainer from './AnswerContainer';
import LoadMoreAnswers from './LoadMoreAnswers';
import QHelpfulAddAnswer from './QHelpfulAddAnswer';
import SignatureHelpfulReport from './SignatureHelpfulReport';

describe('QuestionsAndAnswers component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QuestionsAndAnswers />);
    expect(wrapper).toBeTruthy();
  });
});

describe('QAHeader component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QAHeader />);
    expect(wrapper).toBeTruthy();
  });
});

describe('SearchBar component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper).toBeTruthy();
  });
});

describe('QAList component', () => {
  let filteredQs = [
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

  let answers = {
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

  it('renders without crashing', () => {
    const wrapper = shallow(<QAList filteredQs={filteredQs} answers={answers} />);
    expect(wrapper).toBeTruthy();
  });
});

describe('QAButtons component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QAButtons />);
    expect(wrapper).toBeTruthy();
  });
});

describe('AnswerModal component', () => {
  let photos = ['photo1', 'photo2', 'photo3'];

  it('renders without crashing', () => {
    const wrapper = shallow(<AnswerModal photos={photos}/>);
    expect(wrapper).toBeTruthy();
  });
});

describe('QuestionModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QuestionModal />);
    expect(wrapper).toBeTruthy();
  });
});

describe('AnswerContainer component', () => {
  let photos = ['photo1', 'photo2', 'photo3'];

  it('renders without crashing', () => {
    const wrapper = shallow(<AnswerContainer photos={photos}/>);
    expect(wrapper).toBeTruthy();
  });
});

describe('LoadMoreAnswers component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoadMoreAnswers />);
    expect(wrapper).toBeTruthy();
  });
});

describe('QHelpfulAddAnswer component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QHelpfulAddAnswer />);
    expect(wrapper).toBeTruthy();
  });
});

describe('SignatureHelpfulReport component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SignatureHelpfulReport />);
    expect(wrapper).toBeTruthy();
  });
});