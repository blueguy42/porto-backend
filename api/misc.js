const { miscController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/count', miscController.getVisitorCount);
router.post('/count', miscController.addVisitorCount);

module.exports = router;