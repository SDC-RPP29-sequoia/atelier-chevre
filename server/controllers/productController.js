require('dotenv').config();
const axios = require('axios');
const PDURL = process.env.PDURL;

const getProduct = (req, res) => {
  axios.get(`${PDURL}/products/${req.params.productId}`, {
    headers: {
      'Authorization': process.env.TOKEN
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};

const getProductStyles = (req, res) => {
  axios.get(`${PDURL}/products/${req.params.productId}/styles`, {
    headers: {
      'Authorization': process.env.TOKEN
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = {
  getProduct,
  getProductStyles
};