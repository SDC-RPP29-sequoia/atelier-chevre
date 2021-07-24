const express = require('express');
const app = express();
require('dotenv').config();

const request = require('request');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: __dirname + '/../client/public/photos',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/uploadPhotos', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log('err', err);
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});

app.post('/questions', (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${req.body.productId}&page=1&count=100`;

  request({
    method: 'GET',
    url,
    headers: {
      Authorization: process.env.TOKEN
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
      Authorization: process.env.TOKEN
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
      Authorization: process.env.TOKEN
    }
  }, (err, response, body) => {
    if (err) {
      console.log('q helpful err', err);
    }

    res.send(body);
  });
});

app.post('/reportQuestion', (req, res) => {
  let questionId = req.body.questionId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/report`;

  request({
    method: 'PUT',
    url,
    headers: {
      Authorization: process.env.TOKEN
    }
  }, (err, response, body) => {
    if (err) {
      console.log('report question err', err);
    }

    res.send(body);
  });
});

app.post('/reportAnswer', (req, res) => {
  let answerId = req.body.answerId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`;

  request({
    method: 'PUT',
    url,
    headers: {
      Authorization: process.env.TOKEN
    }
  }, (err, response, body) => {
    if (err) {
      console.log('report answer err', err);
    }

    res.send(body);
  });
});

app.post('/addQuestion', (req, res) => {
  let json = req.body.data;
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions';

  request({
    method: 'POST',
    url,
    headers: {
      Authorization: process.env.TOKEN
    },
    json
  }, (err, response, body) => {
    if (err) {
      console.log('add question err', err);
    }

    res.send(body);
  });
});

app.post('/addAnswer', (req, res) => {
  let questionId = req.body.questionId;
  let json = req.body.data;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`;

  request({
    method: 'POST',
    url,
    headers: {
      Authorization: process.env.TOKEN
    },
    json
  }, (err, response, body) => {
    if (err) {
      console.log('add answer err', err);
    }

    res.send(body);
  });
});


app.listen(process.env.PORT, () => {
  console.log('App listening on port ', process.env.PORT);
});