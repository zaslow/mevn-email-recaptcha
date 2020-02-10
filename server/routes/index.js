const express = require('express');

const mail = require('./mail');
const recaptcha = require('./recaptcha');

const router = express.Router();

router.use('/mail', mail);
router.use('/recaptcha', recaptcha);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;
