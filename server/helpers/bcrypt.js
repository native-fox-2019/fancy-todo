const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    bcrypt: (password) => {
        return bcrypt.hash(password, saltRounds)
    },
    compare: (password, hashed) => {
        return bcrypt.compare(password, hashed)
    }
}