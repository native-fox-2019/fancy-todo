require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function sendmail(title) {
    const msg = {
      to: 'akbarajo1234@gmail.com',
      from: 'akbarajo1234@gmail.com',
      subject: 'Your Todo has been added',
      text: `Your Todo with title ${title} successfully added`
    };
    sgMail.send(msg);
}

module.exports = sendmail;