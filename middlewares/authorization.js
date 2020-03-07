const { Todo } = require('../models')

function authorization (req,res,next){
    Todo.findOne ({where:{id:req.params.id}})
    .then (todo =>{

        if (todo){
            if (todo.UserId===req.userData.id){
                next()
            }else{
                // next(err)
                // res.status(400).json('error di authorization, not autorize')
                let obj ={
                    status:400,
                    msg:"user not authorized"
                }
                throw obj
            }
        }else{
            let obj={
                status:404,
                msg:`Todo with ${req.params.id} does not exist`
            }
        throw obj
        }

    })
    .catch(err =>{
        next(err)
    })
}

module.exports = authorization