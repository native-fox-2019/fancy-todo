const jwt = require('jsonwebtoken')
require('dotenv').config()


function authentication(req,res,next){
    const  token  = req.headers.token
    try{
        var decoded = jwt.verify(token, process.env.SECRET);
        req.userData=decoded
        console.log(req.userData)
        next()
    }catch(err){
        next(err)
    }
}


module.exports = authentication