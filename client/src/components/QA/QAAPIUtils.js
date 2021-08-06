import axios from 'axios';

export default {
  getQuestions: (productId) => {
    return axios.get(`/api/questions/${productId}`);
  },

  postAnswer: (formData) => {
    return axios.post('/api/questions/addAnswer', formData);
  },

  postQuestion: (data) => {
    return axios.post('/api/questions', data);
  },

  markHelpful: (target, data) => {
    let url;

    if (target === 'answer-helpful') {
      url = '/api/questions/answerHelpful';
    } else if (target === 'question-helpful') {
      url = '/api/questions/questionHelpful';
    }

    return axios.put(url, data);
  },

  report: (target, data) => {
    let url;

    if (target === 'report-answer') {
      url = '/api/questions/reportAnswer';
    } else if (target === 'report-question') {
      url = '/api/questions/reportQuestion';
    }

    return axios.put(url, data);
  },

  sendClickData: (clickData) => {
    return axios.post('/api/interactions/clickData', clickData);
  }
};