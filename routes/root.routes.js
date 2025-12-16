const express = require('express');

const {handleGetUrlById,handleGetHomePage} = require('../controller/root.controller.js');

const router = express.Router();

router.get('/', handleGetHomePage)
router.get('/u/:id', handleGetUrlById);

module.exports = router;