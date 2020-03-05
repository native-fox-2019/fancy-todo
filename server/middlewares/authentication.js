const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    try {
        let decoded = jwt.verify(request.headers.token, 'rahasia')
        User.findByPk(decoded.id)
        .then( result => {
            if(result){
                next()
            }else{
                throw {
                    status_code: 400,
                    type: 'Bad Request',
                    message: 'unauthenticated user'
                }
            }
        } )
    } catch(err) {
        next({
            status_code: 400,
            type: 'Bad Request',
            message: 'unauthenticated user'
        })
    }
}