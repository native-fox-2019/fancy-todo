require('dotenv').config();
const jwt = require('jsonwebtoken');

function makeToken(data) {
    let token = jwt.sign({
        id: data.id,
        email: data.email
    }, process.env.JWT_SECRET);
    return token
}

module.exports = makeToken