const nodemailer = require('nodemailer');

module.exports = async function(req, res) {
  console.log(req.body);

  const prefix = 'YMBC';
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  if (process.ENV.EMAIL_PREFIX) {
    req.body.subject = `${process.ENV.EMAIL_PREFIX}: ${req.body.subject}`;
  }

  try {
    let info = await transporter.sendMail({
      from: `${req.body.name}, <${req.body.emailAddress}>`,
      to: req.body.to,
      subject: req.body.subject,
      html: '<h3 style=\'display:inline-block\'>From: </h3>' +
        `<span style='display:inline-block;margin-left:.25rem'>${req.body.emailAddress}</span><br />` +
        '<h3 style=\'display:inline-block\'>Name: </h3>' +
        `<span style='display:inline-block;margin-left:.25rem'>${req.body.name}</span><br />` +
        '<h3 style=\'display:inline-block\'>Subject: </h3>' +
        `<span style='display:inline-block;margin-left:.25rem'>${req.body.subject}</span><br />` +
        '<h3>Message: </h3>' +
        `<p>${req.body.content}</p>`
    });

    console.log('Message sent: %s', info.messageId);
    res.json(info);
  } catch(e) {
    console.log('Sending failed: %e', e);
    res.status(500).send({ error: e });
  }
};
