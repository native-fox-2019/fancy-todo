"use strict"
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    const {token} = req.headers
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded, '======== INI DECODED')
        req.userData = decoded
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication