const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    try {
        const token = req.headers.token
        const verify = jwt.verify(token, process.env.secretCode)
        req.user = verify
        next()
    } catch (error) {
        throw {
            status: 401,
            msg: 'Invalid Token'
        }
    }
}

module.exports = authentication