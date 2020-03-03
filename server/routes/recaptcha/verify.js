const axios = require('axios');

const recaptchaUri = process.env.RECAPTCHA_URI;
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

module.exports = async function(req, res) {
  console.log(req.body);

  try {
    const recaptchaReq = {
      uri: `${recaptchaUri}?response=${req.body.token}&secret=${recaptchaSecretKey}`,
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }
    };

    // I hate that Google requires POST with query params
    const recaptchaRes = await axios.post(recaptchaReq.uri, {}, recaptchaReq.config);

    if (recaptchaRes.data.success) {
      console.log('Recaptcha verified - ', recaptchaRes.data);
      res.status(200).send(recaptchaRes.data);
    } else {
      console.log('Recaptcha verification failed - ', recaptchaRes.data);
      res.status(500).send({ error: recaptchaRes.data['error-codes'] });
    }
  } catch (error) {
    console.log('Recaptcha verification failed - ', error);
    res.status(500).send({ error });
  }
};
