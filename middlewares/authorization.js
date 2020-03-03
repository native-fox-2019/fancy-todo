const { Todo } = require('../models')

module.exports = (request, response, next) => {
    let id = request.params.task_id
    Todo.findByPk(id)
    .then( result => {
        if(!result){
            throw {
                status_code: 404,
                message: 'task not found'
            }
        }else{
            if(result.user_id == request.userData.id){
                next()
            }else{
                throw {
                    status_code: 400,
                    message: 'not authorized'
                }
            }
        }
    } )
    .catch( err => {
        next(err)
    } )
}