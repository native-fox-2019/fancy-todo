const bcrypt = require('bcrypt')


function compareBcrypt (password , hash){
    return bcrypt.compare(password, hash)
}

module.exports = compareBcrypt