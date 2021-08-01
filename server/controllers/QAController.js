require('dotenv').config();
const axios = require('axios');
const imgbbUploader = require('imgbb-uploader');
const multer = require('multer');
const upload = multer();

const getQuestions = (req, res) => {
  let num = req.params.productId;

  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${num}&page=1&count=100`;

  axios.get(url, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log('err', err);
    });
};

const postQuestion = (req, res) => {
  let data = req.body.data;
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions';

  axios.post(url, data, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('err', err);
    });
};

const markAnswerHelpful = (req, res) => {
  let answerId = req.body.answerId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/helpful`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const markQuestionHelpful = (req, res) => {
  let questionId = req.body.questionId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/helpful`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const reportQuestion = (req, res) => {
  let questionId = req.body.questionId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/report`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const reportAnswer = (req, res) => {
  let answerId = req.body.answerId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const postAnswer = (req, res) => {
  let questionId = req.body.questionId;
  let data = req.body.data;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`;

  console.log('server answer data', data);

  axios.post(url, data, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getQuestions,
  postQuestion,
  markAnswerHelpful,
  markQuestionHelpful,
  reportQuestion,
  reportAnswer,
  postAnswer
};