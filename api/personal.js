const { personalController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/get', personalController.read);
router.put('/putName', authController.verifyTokenMiddleware, personalController.updateName);


module.exports = router;