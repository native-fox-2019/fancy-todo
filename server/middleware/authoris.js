const { User, Todo } = require('../models')
const createError = require('../helper/http-errors')

module.exports = (req, res, next) => {

  let UserId = req.user.id
  let id = req.params.id
  // console.log(id, '<<<<<<< id')
  Todo
    .findOne({ where: { id } })
    .then(result => {
      if (!result) {
        throw createError(404, 'not found')
      } else {
        if (result.UserId === UserId) {
          next()
        } else {
          throw createError(403, 'Forbidden')
        }
      }
    })
    .catch(next)

}