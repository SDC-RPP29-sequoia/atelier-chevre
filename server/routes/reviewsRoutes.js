const express = require('express');
const reviewsRouter = express.Router();
const reviewsController = require('../controllers/reviewsController');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const upload = multer();


reviewsRouter.get('/:productId/:sortMethod', reviewsController.getSortedReviews);

reviewsRouter.get('/:productId/', reviewsController.getReviews);

reviewsRouter.put('/:reviewId', cookieParser(), reviewsController.markReviewHelpful);

reviewsRouter.post('/', upload.any(), reviewsController.postNewReview);

module.exports = reviewsRouter;
