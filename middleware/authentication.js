const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    const {token} = req.headers
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userdata = decoded
        next()
    } catch (e) {
        res.send(e)
    }
}

module.exports = authentication