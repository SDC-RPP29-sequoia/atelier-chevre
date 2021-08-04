import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { TestableQuestionsAndAnswers} from './QuestionsAndAnswers';
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

describe('<QuestionsAndAnswers />', () => {
  let QA, header, searchBar, list, buttons, answerForm, questionForm, answers, loadMoreAs, QHelpful, signatureHelpful;

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

  let mockPhotos = ['photo1', 'photo2', 'photo3'];

  beforeEach(() => {
    QA = shallow(<TestableQuestionsAndAnswers productId="28213"/>);
    header = shallow(<TestableQAHeader />);
    searchBar = shallow(<TestableSearchBar />);
    list = shallow(<TestableQAList filteredQs={mockfilteredQs} answers={mockAnswers} />);
    buttons = shallow(<TestableQAButtons />);
    answerForm = shallow(<TestableAnswerModal photos={mockPhotos}/>);
    questionForm = shallow(<TestableQuestionModal />);
    answers = shallow(<TestableAnswerContainer photos={mockPhotos}/>);
    loadMoreAs = shallow(<TestableLoadMoreAnswers />);
    QHelpful = shallow(<TestableQHelpfulAddAnswer />);
    signatureHelpful = shallow(<TestableSignatureHelpfulReport />);
  });

  it('wrapper renders without crashing', () => {
    expect(QA).toBeTruthy();
  });

  it('header renders without crashing', () => {
    expect(header).toBeTruthy();
    expect(header.find('div')).toHaveLength(1);
  });

  it('search bar renders without crashing', () => {
    expect(searchBar).toBeTruthy();
  });

  it('list renders without crashing', () => {
    expect(list).toBeTruthy();
  });

  it('buttons renders without crashing', () => {
    expect(buttons).toBeTruthy();
  });

  it('answer form renders without crashing', () => {
    expect(answerForm).toBeTruthy();
  });

  it('question form renders without crashing', () => {
    expect(questionForm).toBeTruthy();
  });

  it('answers renders without crashing', () => {
    expect(answers).toBeTruthy();
  });

  it('load more answers renders without crashing', () => {
    expect(loadMoreAs).toBeTruthy();
  });

  it('q helpful add answer renders without crashing', () => {
    expect(QHelpful).toBeTruthy();
  });

  it('signature helpful report renders without crashing', () => {
    expect(signatureHelpful).toBeTruthy();
  });
});