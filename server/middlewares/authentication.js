const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    let { token } = req.headers
    try {
        req.userData = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication