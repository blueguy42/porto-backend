const { personalController } = require('../controller');
const { authController } = require('../controller');

const express = require('express');
const router = express.Router();

router.get('/get', personalController.read);
router.put('/putName', authController.verifyTokenMiddleware, personalController.updateName);
router.put('/putNickname', authController.verifyTokenMiddleware, personalController.updateNickname);
router.put('/putSubtitle1', authController.verifyTokenMiddleware, personalController.updateSubtitle1);
router.put('/putSubtitle2', authController.verifyTokenMiddleware, personalController.updateSubtitle2);


module.exports = router;