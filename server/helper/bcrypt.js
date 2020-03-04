const bcrypt = require(`bcrypt`)
const saltRound = 10

function hashPassword (password) {
    return bcrypt.hash(password, saltRound)
}

function decodePassword (password, hashed) {
    return bcrypt.compare(password, hashed)
}

module.exports = { hashPassword, decodePassword }