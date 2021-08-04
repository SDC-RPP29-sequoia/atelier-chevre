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

  it('<QuestionsAndAnswers /> renders all elements', () => {
    expect(QA).toBeTruthy();
  });

  it('<QAHeader /> renders all elements', () => {
    expect(header).toBeTruthy();
    expect(header.find('#QAHeader')).toHaveLength(1);
  });

  it('<SearchBar /> renders all elements', () => {
    expect(searchBar).toBeTruthy();
    expect(searchBar.find('#search')).toHaveLength(1);
    expect(searchBar.find('input')).toHaveLength(1);
  });

  it('<QAList /> renders all elements provided data', () => {
    expect(list).toBeTruthy();
    expect(list.find('#qa-list')).toHaveLength(1);
  });

  it('<QAList /> renders provided no data', () => {
    let faultyList = shallow(<TestableQAList />);

    expect(faultyList).toBeTruthy();
    expect(faultyList.find('#noQs')).toHaveLength(1);
  });

  it('<QAButtons /> renders all elements', () => {
    expect(buttons).toBeTruthy();
    expect(buttons.find('#buttons')).toHaveLength(1);
    expect(buttons.find('button')).toHaveLength(2);
  });

  it('<AnswerModal /> renders all elements', () => {
    expect(answerForm).toBeTruthy();
    expect(answerForm.find('.modal')).toHaveLength(1);
    expect(answerForm.find('.modal-content')).toHaveLength(1);
    expect(answerForm.find('form')).toHaveLength(1);
  });

  it('<QuestionModal /> renders all elements', () => {
    expect(questionForm).toBeTruthy();
    expect(questionForm.find('.modal-q')).toHaveLength(1);
    expect(questionForm.find('.modal-content')).toHaveLength(1);
    expect(questionForm.find('form')).toHaveLength(1);
  });

  it('<AnswerContainer /> renders all elements', () => {
    expect(answers).toBeTruthy();
    expect(answers.find('.answer-container')).toHaveLength(1);
  });

  it('<LoadMoreAnswers /> renders all elements', () => {
    expect(loadMoreAs).toBeTruthy();
    expect(loadMoreAs.find('.load-more-answers')).toHaveLength(1);
  });

  it('<QHelpfulAddAnswer /> renders all elements', () => {
    expect(QHelpful).toBeTruthy();
    expect(QHelpful.find('.qhelpful-addanswer')).toHaveLength(1);
    expect(QHelpful.find('.question-helpful')).toHaveLength(1);
    expect(QHelpful.find('.add-answer')).toHaveLength(1);
    expect(QHelpful.find('.report-question')).toHaveLength(1);
  });

  it('<SignatureHelpfulReport /> renders all elements', () => {
    expect(signatureHelpful).toBeTruthy();
    expect(signatureHelpful.find('.signature-helpful-report')).toHaveLength(1);
    expect(signatureHelpful.find('.author-date')).toHaveLength(1);
    expect(signatureHelpful.find('.answer-helpful')).toHaveLength(1);
    expect(signatureHelpful.find('.report-answer')).toHaveLength(1);
  });
});