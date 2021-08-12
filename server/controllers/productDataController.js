const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { thumbnailify } = require('./reviewsController');

const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { App } = require('../../client/src/components/App/App.jsx');


const getProductData = async (req, res) => {
  try {
    const productId = req.params.productId;
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
    const headers = {
      headers: {
        'Authorization': process.env.TOKEN
      }
    };

    // FETCH REVIEWS
    if (productId !== 'undefined') {
      const getReviews = axios.get(`${url}/reviews?product_id=${productId}&count=500sort=relevence`, headers);
      const reviewsMeta = axios.get(`${url}/reviews/meta?product_id=${productId}`, headers);
      const product = axios.get(`${url}/products/${productId}`, headers);
      const productStyles = axios.get(`${url}/products/${productId}/styles`, headers);
      const questions = axios.get(`${url}/qa/questions?product_id=${productId}&page=1&count=100`, headers);

      const apiData = await Promise.all([getReviews, reviewsMeta, product, productStyles, questions]);
      const reviewsWithThumbnail = thumbnailify(apiData[0].data);

      const productData = {
        productId,
        reviews: reviewsWithThumbnail,
        reviewsMeta: apiData[1].data,
        product: apiData[2].data,
        productStyles: apiData[3].data,
        questions: apiData[4].data
      };

      fs.readFile(path.resolve( __dirname, '../../client/public/index.html' ), 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error');
        }
        const { reviews, reviewsMeta, product, productStyles, questions} = productData;

        let appHTML = ReactDOMServer.renderToString(<App
          reviews={reviews}
          reviewsMeta={reviewsMeta}
          product={product}
          productStyles={productStyles}
          questions={questions}
        />);

        res.contentType('text/html');
        res.status(200);
        return res.send(data.replace(
          '<div id="app"></div>',
          `<script>window.__PRODUCT_ID__=${JSON.stringify(productData)}</script>
          <div id="app">${ appHTML }</div>`));
      });
    } else {
      res.end();
    }
  } catch (err) {
    res.end();
  }
};

module.exports = getProductData;
