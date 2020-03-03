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
      if(err.status_code == 404){
        next(err)
      }else{
        next({
          status_code: 400,
          message: 'not authentificated'
        })
      }
    }
}