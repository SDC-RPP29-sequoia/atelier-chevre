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

describe('Questions & Answers component', () => {
  let QA, header, searchBar, list, buttons, answerForm, questionForm, answers, loadMoreAs, QHelpful, signatureHelpful;

  beforeEach(() => {
    QA = shallow(<QuestionsAndAnswers />);
    header = shallow(<QAHeader />);
    searchBar = shallow(<SearchBar />);
    list = shallow(<QAList filteredQs={QA.state.filteredQs} answers={QA.state.answers} />);
    buttons = shallow(<QAButtons />);
    answerForm = shallow(<AnswerModal photos={QA.state.photos}/>);
    questionForm = shallow(<QuestionModal />);
    answers = shallow(<AnswerContainer photos={QA.state.photos}/>);
    loadMoreAs = shallow(<LoadMoreAnswers />);
    QHelpful = shallow(<QHelpfulAddAnswer />);
    signatureHelpful = shallow(<SignatureHelpfulReport />);
  });

  it('wrapper renders without crashing', () => {
    expect(QA).toBeTruthy();
  });

  it('header renders without crashing', () => {
    expect(header).toBeTruthy();
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

// let photos = ['photo1', 'photo2', 'photo3'];