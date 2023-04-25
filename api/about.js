const { aboutController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/getSlogan', aboutController.readSlogan);
router.put('/putSlogan', authController.verifyTokenMiddleware, aboutController.updateSlogan);
router.get('/getDescription', aboutController.readDescription);
router.put('/putDescription', authController.verifyTokenMiddleware, aboutController.updateDescription);

router.get('/getLink', aboutController.readLink);
router.put('/putEmail', authController.verifyTokenMiddleware, aboutController.updateEmail);
router.put('/putLinkedIn', authController.verifyTokenMiddleware, aboutController.updateLinkedIn);

module.exports = router;