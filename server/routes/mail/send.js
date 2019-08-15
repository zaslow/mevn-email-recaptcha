const nodemailer = require('nodemailer');

module.exports = async function(req, res) {
  const prefix = 'YMBC';
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'tester.user.3030@gmail.com',
      pass: 'TesterUser3030'
    }
  });

  try {
    // const from = `${req.body.name}, <${req.body.email}>`;
    let info = await transporter.sendMail({
      from: `${req.body.name}, <${req.body.email}>`,
      to: req.body.to,
      subject: `${prefix}: ${req.body.subject}`,
      html: '<h3 style=\'display:inline-block\'>From: </h3>' +
        `<span style='display:inline-block;margin-left:.5rem'>${req.body.email}</span><br />` +
        '<h3 style=\'display:inline-block\'>Name: </h3>' +
        `<span style='display:inline-block;margin-left:.5rem'>${req.body.name}</span><br />` +
        '<h3 style=\'display:inline-block\'>Subject: </h3>' +
        `<span style='display:inline-block;margin-left:.5rem'>${req.body.subject}</span><br />` +
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
