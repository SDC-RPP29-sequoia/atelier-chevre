const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const reviewsRouter = require('./routes/reviewsRoutes');
const QARouter = require('./routes/QARoutes');
const productRouter = require('./routes/productRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

// ROUTES
app.use('/api/reviews', reviewsRouter);
app.use('/api/questions', QARouter);
app.use('/api/products', productRouter);

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
