const express = require('express');
const router = express.Router();

const auth = require('./auth');
const email = require('./email');
const personal = require('./personal');

router.use('/auth', auth);
router.use('/email', email);
router.use('/personal', personal);

module.exports = router;