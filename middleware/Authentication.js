const JWT = require('jsonwebtoken')

function authenticationUser(req, res, next){
    const token = req.headers
    try{
        let decoded = JWT.verify(token, process.env.JWT_SECRET)
        next();
    }   
}