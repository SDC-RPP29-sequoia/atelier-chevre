import API from './QAAPIUtils';
import axios from 'axios';
jest.mock('axios');

describe('Q&A API Utilities', () => {
  it('should return axios response when invoking getQuestions', done => {
    const questions = {questions: []};
    axios.get.mockResolvedValue(questions);

    API.getQuestions('id')
      .then(response => {
        expect(response).toEqual(questions);
        expect(axios.get).toHaveBeenCalledWith('/api/questions/id');
      });
    done();
  });

  it('should return axios response when invoking postAnswer', done => {
    const questions = {questions: []};
    axios.post.mockResolvedValue(questions);

    API.postAnswer({})
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });

  it('should return axios response when invoking postQuestion', done => {
    const questions = {questions: []};
    axios.post.mockResolvedValue(questions);

    API.postQuestion({data: 'data'})
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });

  it('should return axios response when marking question helpful', done => {
    const questions = {questions: []};
    axios.put.mockResolvedValue(questions);

    API.markHelpful('question-helpful', {})
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });

  it('should return axios response when marking answer helpful', done => {
    const questions = {questions: []};
    axios.put.mockResolvedValue(questions);

    API.markHelpful('answer-helpful', {})
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });

  it('should return axios response when reporting answer', done => {
    const questions = {questions: []};
    axios.put.mockResolvedValue(questions);

    API.report('report-answer', {})
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });

  it('should return axios response when reporting question', done => {
    const questions = {questions: []};
    axios.put.mockResolvedValue(questions);

    API.report('report-question', {})
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });


  it('should return axios response when invoking sendClickData', done => {
    const questions = {questions: []};
    axios.post.mockResolvedValue(questions);

    API.sendClickData()
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });

});