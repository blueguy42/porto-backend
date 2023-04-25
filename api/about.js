const { aboutController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/getSlogan', aboutController.readSlogan);
router.put('/putSlogan', authController.verifyTokenMiddleware, aboutController.updateSlogan);


module.exports = router;