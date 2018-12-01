const express = require('express');
const controller = require('./characters.controller');
const controller = require('./newReleases.controller');

const router = express.Router();

router.get('/', controller.get);

module.exports = router;