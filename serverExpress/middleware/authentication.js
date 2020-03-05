const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    const { token } = req.headers
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded
        next()
      } catch(err) {
        let error = {status: 401, msg: 'please login'};
        next(error)
      }
}

module.exports = authentication