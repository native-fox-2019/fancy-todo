const jwt = require('jsonwebtoken')
const { verifyJwt } = require('../helper/jwt')
const { User } = require('../models')
const createError = require('../helper/http-errors')

module.exports = (req, res, next) => {
  const token = req.headers.token
  try {
    const user = verifyJwt(token)
    req.user = user
    User.findOne({ where: { id: req.user.id } })
      .then(dataUser => {
        if (!dataUser) {
          throw createError(404, 'Not Found')
        } else {
          next()
        }
      })
    // next()
  }
  catch (err) {
    next(err)
    // res.status(404).json('invalid token')
  }

}