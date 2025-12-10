const express = require('express');

const {handleGenerateShortUrl, handleGetAnalyticsById} = require('../controller/url.controller.js');

const router = express.Router();

router.post('/', handleGenerateShortUrl);

router.get('/analytics/:id', handleGetAnalyticsById);

module.exports = router;