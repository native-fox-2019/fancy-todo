const jwt = require(`../helpers/jwt`)

module.exports = (req, res, next) => {
    var { token } = req.headers

    try {
        req.userData = jwt.jwtVerify(token)
    } catch (err) {
        next(err)
    }
    next()
}