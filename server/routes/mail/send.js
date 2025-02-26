const compile = require('es6-template-strings/compile');
const resolveToString = require('es6-template-strings/resolve-to-string');
const fs = require('fs');
const nodemailer = require('nodemailer');

const insert = require('../../db').insert;

const host = process.env.EMAIL_HOST;
const pass = process.env.EMAIL_PASSWORD;
const prefix = process.env.EMAIL_PREFIX;
const service = process.env.EMAIL_SERVICE;
const user = process.env.EMAIL_USERNAME;

module.exports = async (req, res) => {
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

  const { content, emailAddress, name, subject, to } = req.body;

  try {
    const dbRecord = await insert({ content, name });
    const template = compile(fs.readFileSync(`${__dirname}/message.html`, 'utf8'));
    const info = await transporter.sendMail({
      from: `${req.body.name || 'Anonymous'}, <${req.body.emailAddress}>`,
      to,
      subject,
      html: resolveToString(template, {
        content,
        emailAddress,
        id: dbRecord._id,
        name,
        subject
      })
    });

    console.log('Message sent - ', info.messageId);
    res.json(info);
  } catch(error) {
    console.log('Sending failed - ', error);
    res.status(500).send({ error });
  }
};
