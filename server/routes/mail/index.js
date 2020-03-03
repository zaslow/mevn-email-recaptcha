const express = require('express');

const address = require('./address');
const send = require('./send');

const mail = express.Router();

mail.post('/', send);
mail.get('/address', address);

module.exports = mail;
