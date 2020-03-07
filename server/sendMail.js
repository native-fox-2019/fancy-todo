require('dotenv').config();

const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});

function sendMail(todo){
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'erlangamara@gmail.com',
    subject: 'Hello',
    text: `${todo} has been created to your list.`
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = sendMail;