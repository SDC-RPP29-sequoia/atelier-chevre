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
const trackerRouter = require('./routes/trackerRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/public'));

// ROUTES
app.use('/api/reviews', reviewsRouter);
app.use('/api/questions', QARouter);
app.use('/api/products', productRouter);
app.use('/api/interactions', trackerRouter);

// BUNDLE
app.get('/bundle.js', (req, res) => {
  if (req.header('Accept-Encoding').includes('br')) {
    res.set('Content-Encoding', 'br');
    res.set('Content-type', 'application/javascript');
    res.sendFile((join(__dirname, 'public', 'bundle.js.br')));
  }

  res.sendFile((join(__dirname, 'public', 'bundle.js.')));
});

app.listen(process.env.PORT, () => {
  console.log('App listening on port ', process.env.PORT);
});