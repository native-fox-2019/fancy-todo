const jwt = require('jsonwebtoken')
require('dotenv').config()

function authentication(req,res,next){
    const { token } = req.headers
    console.log(token)
    try {let decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.userData = decode;
         next()
    } catch(err){
        next(err)
    }
}

module.exports = authentication