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

  it('should return axios response when invoking markHelpful', done => {
    const questions = {questions: []};
    axios.put.mockResolvedValue(questions);

    API.markHelpful('id', {})
      .then(response => {
        expect(response).toEqual(questions);
      });
    done();
  });

  it('should return axios response when invoking report', done => {
    const questions = {questions: []};
    axios.put.mockResolvedValue(questions);

    API.report('id', {})
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