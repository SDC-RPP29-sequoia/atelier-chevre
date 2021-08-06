const express = require('express');
const trackerRouter = express.Router();
const sendClickData = require('../controllers/trackerController');

trackerRouter.post('/clickData', sendClickData);

module.exports = trackerRouter;
