const { Todo } = require('../models')
function authorization(req, res, next){
    Todo.findOne({
        where: {id: req.params.id}
    })
    .then(todo=>{
        if(todo.userId === req.UserData.id)
        next()
    })
    .catch(e => resizeBy.send(e))
}

module.exports = authorization