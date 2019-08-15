const nodemailer = require('nodemailer');

module.exports = async function(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'tester.user.3030@gmail.com',
      pass: 'TesterUser3030'
    }
  });

  try {
    let info = await transporter.sendMail({
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text
    });

    console.log('Message sent: %s', info.messageId);
    res.json(info);
  } catch(e) {
    console.log('Sending failed: %e', e);
    res.status(500).send({ error: e });
  }
};
