const jwt = require('../helpers/jwt')

module.exports=(req,res,next)=>{
    let { token } = req.headers
        try{
            req.userData = jwt.jwtVerify(token)
            next()
        } catch(err){
            next(err)
        }
    }
