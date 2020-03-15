const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function authentication(req, res, next) {
    let token = req.headers.token;
    try {
        let decoded = jwt.verify(token, process.env.AUTH_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;