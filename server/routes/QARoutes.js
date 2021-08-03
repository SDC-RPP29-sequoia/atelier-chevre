const express = require('express');
const QARouter = express.Router();
const QAController = require('../controllers/QAController');
const multer = require('multer');
const upload = multer();

QARouter.get('/:productId', QAController.getQuestions);
QARouter.post('/', QAController.postQuestion);
QARouter.post('/addAnswer', upload.any(), QAController.postAnswer);
QARouter.put('/answerHelpful', QAController.markAnswerHelpful);
QARouter.put('/questionHelpful', QAController.markQuestionHelpful);
QARouter.put('/reportAnswer', QAController.reportAnswer);
QARouter.put('/reportQuestion', QAController.reportQuestion);

module.exports = QARouter;