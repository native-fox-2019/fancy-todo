
const sendMail = (name, email) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    const msg = {
        to: 'gustimertaputra@gmail.com',
        from: 'gustimertaputra@gmail.com',
        subject: `Hey ${name} welcome to Gusti's Fancy Todo App`,
        html: `username : ${name} \n email : ${email} \n have fun and G'day mate!!! `
    };
    sgMail.send(msg);
}
module.exports = sendMail