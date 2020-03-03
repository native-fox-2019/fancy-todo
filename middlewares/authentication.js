require('dotenv').config();
let jwt = require('../helpers/jwt');
const createError = require('../helpers/createError');

function authentication (req, res, next) {
    let { token } = req.headers;
    try {
        let decoded = jwt.verify(token, process.env.SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;