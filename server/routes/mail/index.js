const express = require('express');

const send = require('./send');

const mail = express.Router();

mail.post('/', send);

module.exports = mail;
