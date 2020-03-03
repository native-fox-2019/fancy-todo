var jwt = require('jsonwebtoken')

function jwtVerify(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

function jwtSign(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
    jwtVerify,
    jwtSign
}