require('dotenv').config();
const nodeOutlook = require('nodejs-nodemailer-outlook');

module.exports = {
    nodeOutlook: (userMail, userPass) => {
        nodeOutlook.sendEmail({
            auth: {
                user: process.env.OUTLOOK_USER,
                pass: process.env.OUTLOOK_PASS
            },
            from: process.env.OUTLOOK_USER,
            to: userMail,
            subject: `Hey ${userMail.split('@')[0]}! Welcome to Fancy Todo!`,
            html:  `<p><b>Your Login Email: ${userMail}</b></p>
                    <br>
                    <p><b>Your Login Password: ${userPass}</b></p>`,
            replyTo: process.env.OUTLOOK_USER,
            onError: err => res.status(500).json('Oops! We\'re having some trouble sending your password to your email. Please contact us.\n', err),
            onSuccess: (info) => {
                console.log(info)
                res.status(200).json('We\'ve sent an email to your registration email! Check it out!')
            }
        })
    }
}