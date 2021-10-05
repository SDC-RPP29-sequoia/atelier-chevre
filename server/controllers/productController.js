const axios = require('axios');

const getProduct = (req, res) => {
  axios.get(`http://localhost:3000/products/product_id=${req.params.productId}`, {
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
  axios.get(`http://localhost:3000/products/product_id=${req.params.productId}/styles`, {
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