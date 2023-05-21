const { miscController } = require('../controller');

const express = require('express');
const router = express.Router();

router.post('/count', miscController.visitorCount);

module.exports = router;