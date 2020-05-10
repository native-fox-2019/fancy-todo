const { Todo } = require('../models')

module.exports = (req, res, next) => {
  Todo
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      if (!result) {
        throw{
          status: 404,
          msg: "No Data Found."
        }
      }
      else {
        if (result.UserId == req.user.id) {
          next()
        } else {
          throw {
            status: 401,
            msg: "Unauthorized Action."
          }
        }
      }
    })
    .catch(err => {
        next(err)
    })
}