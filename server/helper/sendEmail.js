const sgMail = require('@sendgrid/mail')

function sendEmail (email, msg) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
    const content = {
        to: `${email}`,
        from: 'admin@fancytodo.com',
        subject: 'Added new ToDo list',
        text: '1 more thing added',
        html: msg
    }
    sgMail.send(content)
}

module.exports = sendEmail