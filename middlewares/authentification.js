const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = (request, response, next) => {
    try {
      let decoded = jwt.verify(request.headers.token, process.env.JWT_SECRET)
      User.findByPk(decoded.id)
      .then( result => {
        if(result){
          request.userData = decoded
          next()
        }else{
          throw {
            status_code: 404,
            message: 'user not found'
          }
        }
      } )
    } catch(err) {
      next(err)
    }
}