const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const imgbbUploader = require('imgbb-uploader');

const storage = multer.diskStorage({
  destination: __dirname + '/../client/public/photos',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');
const reviewUpload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

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

app.get('/reviews/:productId/:sortMethod', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.productId}&sort=${req.params.sortMethod}&count=500`, {
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

app.get('/reviews/:productId/', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${req.params.productId}`, {
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

app.put('/reviews/:reviewId', cookieParser(), (req, res) => {
  console.log('req:', req.cookies.helpful);
  if (req.cookies.helpful === undefined) {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.params.reviewId}/helpful`, {}, {
      headers: {
        'Authorization': process.env.TOKEN
      }
    })
      .then(response => {
        res.cookie('helpful', JSON.stringify([`${[req.params.reviewId]}`]));
        res.status(204).send('request complete');
      });
  } else {
    const helpfulClicked = JSON.parse(req.cookies.helpful);
    if (helpfulClicked.includes(req.params.reviewId)) {
      res.status(304).send('helful already clicked for this review');
    } else {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.params.reviewId}/helpful`, {}, {
        headers: {
          'Authorization': process.env.TOKEN
        }
      })
        .then(response => {
          const helpfulSend = [...helpfulClicked, req.params.reviewId];
          res.cookie('helpful', JSON.stringify(helpfulSend));
          res.status(204).send('request complete');
        });
    }
  }

});

app.post('/reviews', reviewUpload.any(), async (req, res) => {
  try {
    const characteristics = {};

    req.body.characteristics.forEach(characteristic => {
      const charData = characteristic.split('-');
      characteristics[parseInt(charData[0])] = parseInt(charData[1]);
    });

    const data = {
      product_id: parseInt(req.body.product_id),
      rating: parseInt(req.body.rating),
      summary: req.body.summary,
      body: req.body.body,
      recommend: req.body.recommend === 'Yes' ? true : false,
      name: req.body.name,
      email: req.body.email,
      photos: [],
      characteristics: characteristics
    };
    const headers = {
      headers: {
        Authorization: process.env.TOKEN
      }
    };

    const files = req.files.map((file, index) => {
      return new Promise(async (resolve, reject) => {
        const base64string = file.buffer.toString('base64');
        const options = {
          apiKey: process.env.IMG_API_KEY,
          base64string
        };
        const url = await imgbbUploader(options);
        resolve(url.image.url);
      });
    });

    const fileURLs = await Promise.all(files);
    data.photos = fileURLs;

    const response = await axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', data, headers);
    console.log(response);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
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
