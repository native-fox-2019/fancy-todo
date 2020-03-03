const { User } = require('../models')

module.exports = (request, response, next) => {
    let id = request.params.id
    try{
        if(id == request.userData.id){
            next()
        }else{
            throw {
                status_code: 400,
                message: 'not authorized'
            }
        }
    }catch(err){
        next(err)
    }
}