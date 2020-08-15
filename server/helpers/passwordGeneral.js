"use strict"
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const generatePass = (plainPass) => {
    return bcrypt.hashSync(plainPass, salt);
}

const comparePass = (plainPass, hash) => {
    return bcrypt.compareSync(plainPass, hash);
}

module.exports = { generatePass, comparePass }