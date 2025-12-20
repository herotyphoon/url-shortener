const express = require('express');

const {handleRenderHomePage, handleRenderSignup, handleRenderLogin, handleRenderHomePageForAdmin} = require('../controller/pages.controller.js');
const {restrictTo} = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/admin', restrictTo(['ADMIN']), handleRenderHomePageForAdmin);

router.get('/', restrictTo(['NORMAL', 'ADMIN']), handleRenderHomePage);

router.get('/signup', handleRenderSignup);

router.get('/login', handleRenderLogin);

module.exports = router;