require('dotenv').config();
const axios = require('axios');
const imgbbUploader = require('imgbb-uploader');
const multer = require('multer');
const upload = multer();


const getSortedReviews = (req, res) => {
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
};

const getReviews = (req, res) => {
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
};

const reportReview = (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.params.reviewId}/report`, {}, {
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
};

const markReviewHelpful = (req, res) => {
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
};

const postNewReview = async (req, res) => {
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
      characteristics: characteristics
    };
    const headers = {
      headers: {
        Authorization: process.env.TOKEN
      }
    };

    if (req.files.length) {
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
    }

    const response = await axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', data, headers);
    res.sendStatus(201);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getSortedReviews,
  getReviews,
  reportReview,
  markReviewHelpful,
  postNewReview
};