const Model = require('../models')
const Todo = Model.Todo

function authorization(req, res, next){
    const id = req.params.id
    const {id: userId} = req.userData
    Todo.findByPk(id)
        .then(todo => {
            if(todo){
                if(todo.UserId === userId){
                    next()
                }
                else{
                    next({
                        status: 403,
                        resource: "todo"
                    })
                }
            }
            else{
                next({
                    status: 404,
                    resource: 'todo'
                })
            }
        })

}

module.exports = authorization