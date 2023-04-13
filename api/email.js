const { emailController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/get', emailController.read);
router.post('/update', emailController.update);

module.exports = router;