"use strict"
const jwt = require('jsonwebtoken')
const verifyToken = (token) => {
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded
}

module.exports = verifyToken