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

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

// ROUTES
app.use('/api/reviews', reviewsRouter);
app.use('/api/questions', QARouter);
app.use('/api/products', productRouter);

//SSR
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { App } = require('../client/src/components/App/App.jsx');

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;

  // FETCH API DATA

  const productData = {
    productId,
    // reviews,
    // questions,
    // product stuff
  };

  fs.readFile(path.resolve( __dirname, '../client/public/index.html' ), 'utf-8', (err, data) => {
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
