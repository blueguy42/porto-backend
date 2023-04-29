const { storageController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/getCvUrl', storageController.getCvUrl);


module.exports = router;