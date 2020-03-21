const bcrypt = require('bcrypt');

function comparePassword(inputPassword, userPassword){
    return bcrypt.compare(inputPassword, userPassword)
}

module.exports = comparePassword