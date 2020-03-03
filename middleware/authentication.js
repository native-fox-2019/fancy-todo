const jwt = require(`jsonwebtoken`)

function authentication (req, res, next) {
    let { token } = req.headers
    
    try {
        // console.log(`masuk bener di authen`)
        req.userData = jwt.verify(token, process.env.SECRET_TOKEN)
        next()
    } catch (error) {
        // console.log(`masuk err di authen`)
        next(err)
    }
}

module.exports = authentication