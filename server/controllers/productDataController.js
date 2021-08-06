const axios = require('axios');
const fs = require('fs');
const path = require('path');

const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { App } = require('../../client/src/components/App/App.jsx');


const getProductData = async (req, res) => {
  try {
    const productId = req.params.productId;
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
    const headers = {
      headers: {
        'Authorization': process.env.TOKEN
      }
    };

    // FETCH REVIEWS
    if (productId !== 'undefined') {
      const reviews = await axios.get(`${url}reviews?product_id=${productId}&count=500`, headers);
      const reviewsMeta = await axios.get(`${url}reviews/meta?product_id=${productId}`, headers);
      // /products/:id
      // /products/:id/styles
      // /qa/...

      const productData = {
        productId,
        reviews: reviews.data,
        reviewsMeta: reviewsMeta.data
        // product:
        // productStyles:
        // questions:
      };

      fs.readFile(path.resolve( __dirname, '../../client/public/index.html' ), 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error');
        }

        let appHTML = ReactDOMServer.renderToString(<App/>);

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
