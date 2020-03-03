const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const createError = require('../helper/http-errors')
class ControllerUser {

  static registerUser(req, res, next) {
    let { username, email, password } = req.body
    User
      .create({ username, email, password })
      .then(userRegister => {
        const token = jwt.sign({ id: userRegister.id, username: userRegister.username, email: userRegister.email }, process.env.JWT)
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
          throw createError(401, 'Unauthorized')
        } else {
          if (bcrypt.compareSync(password, userLogin.password)) {
            const token = jwt.sign({ id: userLogin.id, email: userLogin.email }, process.env.JWT)
            res.status(200).json(token)
          } else {
            throw createError(401, 'Unauthorized')
          }
        }
      })
      .catch(err => {
        next(err)
      })

  }

}
module.exports = ControllerUser