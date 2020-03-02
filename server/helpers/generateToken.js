const jwt = require('jsonwebtoken')

function generateToken(payload) {
    console.log(process.env.DEV_DATABASE_URL)
    return jwt.sign(payload, process.env.SECRET_CODE)
}

module.exports = {generateToken}