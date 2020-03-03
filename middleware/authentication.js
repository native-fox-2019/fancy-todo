const jwt = require('jsonwebtoken')
require('dotenv').config()

function authentication(req,res,next){
    const { token } = req.headers
    try {let decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userData = decode;
         next()
    } catch(err){
        next(err)
    }
}

module.exports = authentication