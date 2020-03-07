function message(to,subject,text) {
    return msg = {
        to: `${to}`,
        from: 'errysatriow@gmail.com',
        subject: `${subject}`,
        text: `${text}`,
        html: `${text}`,
    };
}

module.exports = message