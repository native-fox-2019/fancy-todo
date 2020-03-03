const bcrypt = require('bcrypt')
const saltround = 10

function hashing(password) {
    return bcrypt.hashSync(password, saltRounds)
}

function compare(password) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashing,
    compare
}
