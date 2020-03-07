const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    let { token } = req.headers
    try {
        req.userData = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        next({
            status: 400,
            msg: err.message
        })
    }
}

module.exports = authentication