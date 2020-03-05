const jwt = require(`jsonwebtoken`)

function authentication (req, res, next) {
    let { token } = req.headers
    
    try {
        if (!token) {
            let err = {
                status: 401,
                msg:`token cannot be empty`
            }
            next(err)
        } else {
            req.userData = jwt.verify(token, process.env.SECRET_TOKEN)
            next()
        }
    } catch (error) {
        next({
            status:401,
            msg: error.message
        })
    }
}

module.exports = authentication