var jwt = require('jsonwebtoken');
var createError = require(`http-errors`)

module.exports = (req, res, next) => {
    var { token } = req.headers

    if (token) {
        try {
            var decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            next(err)
        }
        next()
    } else {
        next(createError(401, `Unauthenticated User`))
    }
}