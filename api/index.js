const express = require('express');
const router = express.Router();

const auth = require('./auth');
const email = require('./email');

router.use('/auth', auth);
router.use('/email', email);

module.exports = router;