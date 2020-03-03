const { User, Todo } = require('../models')
const createError = require('../helper/http-errors')

module.exports = (req, res, next) => {
  let UserId = req.user.id
  let id = req.params.id
  Todo
    .findOne({ where: { UserId, id } })
    .then(result => {
      if (!result) {
        throw createError(404, 'not found')
      } else {
        next()
      }
    })
    .catch(next)
}