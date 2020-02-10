const express = require('express');

const verify = require('./verify');

const recaptcha = express.Router();

recaptcha.post('/', verify);

module.exports = recaptcha;
