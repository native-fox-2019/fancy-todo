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
        else {
            res.send('not authorized')
        }
    })
    .catch(e => res.status(404).json({"status": 404, "response": "data not found"}))
}

module.exports = authorization