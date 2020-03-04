const jwt = require(`../helpers/jwt`)

module.exports = (req, res, next) => {
    var { token } = req.headers

    try {
        req.userData.id = jwt.jwtVerify(token)
        next()
    } catch (err) {
        next(err)
    }
}