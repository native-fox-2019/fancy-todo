const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
      const token = req.headers.usertoken;
      var decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch(err) {
      next({
        status:401,
        message: 'Forbidden Access'
      })
    }
  }