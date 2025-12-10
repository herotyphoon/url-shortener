const express = require('express');

const {handleGetUrlById} = require('../controller/root.controller.js');

const router = express.Router();

router.get('/:id', handleGetUrlById);

module.exports = router;