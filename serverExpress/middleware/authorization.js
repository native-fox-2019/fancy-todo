const { Todo } = require('../models')

function authorization(req, res, next){
    let id = req.params.id
    Todo.findOne({where: {id}})
    .then(todo => {
        if(todo){
            if(todo.UserId == req.userData.id){
                next()
            }else{
                throw {status: 403, msg: 'not authorized'}
            }
        }else{
            throw {status: 404, msg: 'not found'}
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization