const { aboutController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/getSlogan', aboutController.readSlogan);
router.put('/putSlogan', authController.verifyTokenMiddleware, aboutController.updateSlogan);
router.get('/getDescription', aboutController.readDescription);
router.put('/putDescription', authController.verifyTokenMiddleware, aboutController.updateDescription);

module.exports = router;