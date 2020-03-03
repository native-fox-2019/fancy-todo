const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    const {token} = req.headers
    try{
        let decoded = jwt.verify(token, 'aaa')
        req.userdata = decoded
        console.log(req.userdata)
        next()
    } catch (e) {
        res.send(e)
    }
}

module.exports = authentication