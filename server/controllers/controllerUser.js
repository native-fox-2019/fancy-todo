const { User } = require('../models')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const { verifyPassword } = require('../helper/bcrypt')
const { generateJwt, verifyJwt } = require('../helper/jwt')
const createError = require('../helper/http-errors')
class ControllerUser {

  static registerUser(req, res, next) {
    let { username, email, password } = req.body
    User
      .create({ username, email, password })
      .then(user => {
        let payload = { id: user.id, username: user.username, email: user.email }
        const token = generateJwt(payload)
        res.status(201).json(token)
      })
      .catch(err => {
        next(err)
      })
  }

  static loginUser(req, res, next) {
    let { email, password } = req.body
    User
      .findOne({ where: { email } })
      .then(userLogin => {
        if (!userLogin) {
          throw createError(400, 'email/password wrong')
        } else {
          if (verifyPassword(password, userLogin.password)) {
            let payload = { id: userLogin.id, email: userLogin.email }
            const token = generateJwt(payload)
            res.status(200).json(token)
          } else {
            throw createError(400, 'email/password wrong')
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

}
module.exports = ControllerUser