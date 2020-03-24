"use strict"
const { verifyToken } = require('../helpers/jwt.js')

function authentication(req, res, next) {
    const { token } = req.headers
    try {
        let decoded = verifyToken(token)
        req.userData = decoded
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication