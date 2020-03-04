'use strict'
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  try {
    const token = req.headers.token
    const user = jwt.verify(token, process.env.secret)
    req.user = user
    // res.send(user)
    next()
  } catch (error) {
    // console.log('masuk sini harusnya');
    throw {
      status: 401,
      msg: 'Wrong Username/Email'
    }
  }
}

module.exports = authentication