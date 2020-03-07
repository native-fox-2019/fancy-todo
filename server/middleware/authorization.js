const { Todo } = require('../models/index.js')

function authorization(req,res,next){
    let params = req.params.id
    Todo.findOne({where:{id:params}})
    .then(todo=>{
        if(todo){
          if(Number(todo.userId) === Number(req.userData.id)){
            next()
            } else{
            next(err)
            }  
          } else{
            next({status: 404, msg: 'Data not found!'})
        }

    })
}

module.exports = authorization