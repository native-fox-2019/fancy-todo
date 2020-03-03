const jwt = require(`jsonwebtoken`)

function authentication (req, res, next) {
    let { token } = req.headers
    
    try {
        req.userData = jwt.verify(token, process.env.SECRET_TOKEN)
        next()
    } catch (error) {
        next(err)
    }
}

module.exports = authentication