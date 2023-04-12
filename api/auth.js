const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.post('/validate', authController.validateToken);

module.exports = router;