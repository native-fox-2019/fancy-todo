const bcrypt = require(`bcrypt`)
const saltRound = 10

function hashPassword (password) {
    // console.log(`masuk hashed helper`)
    return bcrypt.hash(password, saltRound)
}

function decodePassword (password, hashed) {
    return bcrypt.compare(password, hashed)
}

module.exports = { hashPassword, decodePassword }