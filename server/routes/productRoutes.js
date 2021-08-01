const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:productId', productController.getProduct);
router.get('/:productId/styles', productController.getProductStyles);

module.exports = router;