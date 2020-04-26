const express = require('express');

const lastSet = require('./lastSet');
// const save = require('./save');

const quote = express.Router();

quote.get('/last-set', lastSet);
// quote.post('/', save);

module.exports = quote;
