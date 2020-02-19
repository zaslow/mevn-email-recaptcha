const compile = require('es6-template-strings/compile');
const resolveToString = require('es6-template-strings/resolve-to-string');
const fs = require('fs');
const nodemailer = require('nodemailer');

const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
const pass = process.env.EMAIL_PASSWORD;
const prefix = process.env.EMAIL_PREFIX;
const service = process.env.EMAIL_SERVICE || 'gmail';
const user = process.env.EMAIL_USERNAME;

module.exports = async function(req, res) {
  let template;

  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service,
    host,
    auth: {
      user,
      pass
    }
  });

  if (prefix) {
    req.body.subject = `${prefix}: ${req.body.subject}`;
  }

  try {
    const template = compile(fs.readFileSync(`${__dirname}/message.html`, 'utf8'));
    const { content, emailAddress, name, subject, to } = req.body;
    const info = await transporter.sendMail({
      from: `${req.body.name || 'Anonymous'}, <${req.body.emailAddress}>`,
      to,
      subject,
      html: resolveToString(template, {
        content,
        emailAddress,
        name,
        subject
      })
    });

    console.log('Message sent: %s', info.messageId);
    res.json(info);
  } catch(e) {
    console.log('Sending failed: ', e);
    res.status(500).send({ error: e });
  }
};
