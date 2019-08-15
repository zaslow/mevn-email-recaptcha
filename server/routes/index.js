const express = require('express');

const mail = require('./mail');

const router = express.Router();

router.use('/mail', mail);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;
