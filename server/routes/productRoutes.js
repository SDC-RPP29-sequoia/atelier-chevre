const express = require('express');
const compression = require('compression');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:productId', compression(), productController.getProduct);
router.get('/:productId/styles', compression(), productController.getProductStyles);

module.exports = router;