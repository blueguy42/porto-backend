const express = require('express');
const router = express.Router();

const auth = require('./auth');
const email = require('./email');
const personal = require('./personal');
const about = require('./about');
const storage = require('./storage');
const misc = require('./misc');

router.use('/auth', auth);
router.use('/email', email);
router.use('/personal', personal);
router.use('/about', about);
router.use('/storage', storage);
router.use('/misc', misc);

module.exports = router;