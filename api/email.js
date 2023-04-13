const { emailController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/get', authController.verifyToken, emailController.read);
router.post('/update', authController.verifyToken, emailController.update);


module.exports = router;