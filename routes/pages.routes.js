const express = require('express');

const {handleRenderHomePage, handleRenderSignup, handleRenderLogin} = require('../controller/pages.controller.js');

const router = express.Router();

router.get('/', handleRenderHomePage);

router.get('/signup', handleRenderSignup);

router.get('/login', handleRenderLogin);

module.exports = router;