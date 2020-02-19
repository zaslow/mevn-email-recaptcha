const axios = require('axios');

const recaptchaUri = process.env.RECAPTCHA_URI
  || 'https://www.google.com/recaptcha/api/siteverify';
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

module.exports = async function(req, res) {
  console.log(req.body);

  try {
    const data = axios.post(recaptchaUri, {
      response: req.body.token,
      secret: recaptchaSecretKey
    });

    console.log('Recaptcha verified.');
    res.json(data);
  } catch (e) {
    console.log('Recaptcha verification failed: ', e);
    res.status(500).send({ error: e });
  }
};
