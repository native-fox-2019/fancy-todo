const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  const token = req.headers.token
  try {
    const user = jwt.verify(token, process.env.JWT)
    req.user = user
    next()
  }
  catch (err) {
    // next(err)
    res.status(404).json('invalid token')
  }

}