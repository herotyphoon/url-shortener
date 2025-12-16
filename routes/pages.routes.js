const express = require('express');

const {handleRenderHomePage} = require('../controller/pages.controller.js');

const router = express.Router();

router.get('/', handleRenderHomePage);

module.exports = router;