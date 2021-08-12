require('dotenv').config();
const express = require('express');
const app = express();


const reviewsRouter = require('./routes/reviewsRoutes');
const QARouter = require('./routes/QARoutes');
const productRouter = require('./routes/productRoutes');
const productDataRouter = require('./routes/productDataRoutes');
const trackerRouter = require('./routes/trackerRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

app.use('/api/reviews', reviewsRouter);
app.use('/api/questions', QARouter);
app.use('/api/products', productRouter);
app.use('/api/interactions', trackerRouter);
app.use('/products', productDataRouter);


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
