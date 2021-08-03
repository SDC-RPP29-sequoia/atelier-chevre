require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const reviewsRouter = require('./routes/reviewsRoutes');
const QARouter = require('./routes/QARoutes');
const productRouter = require('./routes/productRoutes');

// SSR Babel Config
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { App } = require('../client/src/components/App/App.jsx');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

// ROUTES
app.use('/api/reviews', reviewsRouter);
app.use('/api/questions', QARouter);
app.use('/api/products', productRouter);

//SSR Route
app.get('/ssr', (req, res) => {
  let indexHTML = fs.readFileSync( path.resolve( __dirname, '../client/public/index.html' ), {
    encoding: 'utf8',
  });

  let appHTML = ReactDOMServer.renderToString(<App/>);
  const productId = 23456;

  indexHTML = indexHTML.replace(
    '<div id="app"></div>',

    `<script>window.__PRODUCTID__=${JSON.stringify(productId)}</script>
     <div id="app">${ appHTML }</div>`);

  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
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
