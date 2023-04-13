const { emailController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/get', emailController.read);
router.put('/put', authController.verifyTokenMiddleware, emailController.update);


module.exports = router;