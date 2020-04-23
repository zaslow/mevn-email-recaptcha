const express = require('express');

const find = require('./find');
// const insert = require('./insert');

const quote = express.Router();

quote.get('/', find);
// quote.post('/', insert);

module.exports = quote;
