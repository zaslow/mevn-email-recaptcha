const express = require('express');

const lastSet = require('./lastSet');
const set = require('./set');

const quote = express.Router();

quote.get('/', lastSet);
quote.put('/', set);

module.exports = quote;
