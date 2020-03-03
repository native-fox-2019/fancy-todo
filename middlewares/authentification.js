const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = (request, response, next) => {
    try {
        let decoded = jwt.verify(request.header.token)
        console.log(decoded)
        request.userData = decoded
        next()
      } catch(err) {
        next(err)
      }
}