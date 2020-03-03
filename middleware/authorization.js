const { Todo } = require('../models/index')
function authorization (req, res, next){
    console.log(req.params.id)
    console.log('=====')
    console.log(req.userdata)
    Todo.findOne({
        where: {id: req.params.id}
    })
    .then(todo=>{
        if(todo.userId === req.userdata.id)
        next()
    })
    .catch(e => res.send(e))
}

module.exports = authorization