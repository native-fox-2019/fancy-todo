const bcrypt = require('bcrypt')
const saltRounds = 10

function hashing(password) {
    return bcrypt.hashSync(password, saltRounds)
}

function compare(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashing,
    compare
}