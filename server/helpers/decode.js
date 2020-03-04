const jwt = require('jsonwebtoken')

module.exports = function(token){
  try {
    var decoded = jwt.verify(token, process.env.SECRET);
    return decoded
  } catch(err) {
    res.status(401).json({
      message: 'Forbidden Access'
    });
  }
}