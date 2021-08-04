const express = require('express');
const router = express.Router();
const getProductData = require('../controllers/productDataController');

router.get('/:productId', getProductData);

module.exports = router;