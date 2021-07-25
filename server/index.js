const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');

app.use(express.static(__dirname + '/../client/public'));

app.get('/reviews', (req, res) => {
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

app.listen(process.env.PORT, () => {
  console.log('App listening on port ', process.env.PORT);
});