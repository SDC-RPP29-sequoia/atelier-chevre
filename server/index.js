const express = require('express');
const app = express();
require('dotenv').config();

const request = require('request');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/getQuestions', (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${req.body.productId}`;

  request({
    method: 'GET',
    url,
    headers: {
      Authorization: req.body.auth
    }
  }, (err, response, body) => {
    if (err) {
      console.log('get q err', err);
    }

    let data = JSON.parse(body);

    res.json(data);
  });
});

app.post('/answerHelpful', (req, res) => {
  let answerId = req.body.answerId;

  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/helpful`;

  request({
    method: 'PUT',
    url,
    headers: {
      Authorization: req.body.auth
    }
  }, (err, response, body) => {
    if (err) {
      console.log('a helpful err', err);
    }

    res.send(body);
  });
});

app.post('/questionHelpful', (req, res) => {
  let questionId = req.body.questionId;

  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/helpful`;

  request({
    method: 'PUT',
    url,
    headers: {
      Authorization: req.body.auth
    }
  }, (err, response, body) => {
    if (err) {
      console.log('q helpful err', err);
    }

    res.send(body);
  });
});


app.listen(process.env.PORT, () => {
  console.log('App listening on port ', process.env.PORT);
});