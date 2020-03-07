
const sendMail = (name, email) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.KeyWord);
    const msg = {
        to: 'gustimertaputra@gmail.com',
        from: 'gustimertaputra@gmail.com',
        subject: `Hey ${name} welcome to Gusti's Fancy Todo App`,
        html: `username : ${name} \n email : ${email} \n have fun and G'day mate!!! `
    };
    sgMail.send(msg);
}
module.exports = sendMail