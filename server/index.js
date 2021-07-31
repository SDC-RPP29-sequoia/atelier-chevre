const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const reviewsRouter = require('./routes/reviewsRoutes');

const storage = multer.diskStorage({
  destination: __dirname + '/../client/public/photos',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

// REVIEWS ROUTES
app.use('/api/reviews', reviewsRouter);

// QUESTIONS & ANSWERS
app.get('/questions', (req, res) => {
  let num = Number(req.query.product_id);
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
});

app.post('/questions', (req, res) => {
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
});

app.post('/answerHelpful', (req, res) => {
  let answerId = req.body.answerId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/helpful`;

  axios({
    method: 'PUT',
    url,
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
});

app.post('/questionHelpful', (req, res) => {
  let questionId = req.body.questionId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/helpful`;

  axios({
    method: 'PUT',
    url,
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
});

app.post('/reportQuestion', (req, res) => {
  let questionId = req.body.questionId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/report`;

  axios({
    method: 'PUT',
    url,
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
});

app.post('/reportAnswer', (req, res) => {
  let answerId = req.body.answerId;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`;

  axios({
    method: 'PUT',
    url,
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
});

app.post('/addAnswer', (req, res) => {
  let questionId = req.body.questionId;
  let data = req.body.data;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`;

  axios({
    method: 'POST',
    url,
    data,
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
});

app.post('/QAPhotos', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log('err', err);
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});




app.get('/products/:productId', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.productId}`, {
    headers: {
      'Authorization': process.env.TOKEN
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/products/:productId/styles', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.productId}/styles`, {
    headers: {
      'Authorization': process.env.TOKEN
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

// this one i don't think is getting used
app.get('/getReviews', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.query.productId}`, {
    headers: {
      'Authorization': process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log('App listening on port ', process.env.PORT);
});
