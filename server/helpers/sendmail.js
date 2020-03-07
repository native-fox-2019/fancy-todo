require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function sendmail(email) {
    const msg = {
        to: email,
        from: 'akbarajo1234@gmail.com',
        subject: `Welcome to Fancy Todos`,
        text: `Welcome to Fancy Todos App, enjoy our features!`
    };
    sgMail.send(msg);
}

module.exports = sendmail;