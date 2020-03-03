const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticationUser(req, res, next) {
    const { token } = req.headers
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authenticationUser