const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.static(__dirname + '/../client/public'));

app.listen(process.env.PORT, () => {
  console.log('App listening on port ', process.env.PORT);
});