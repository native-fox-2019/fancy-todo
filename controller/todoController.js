const { Todo } = require('../models/index.js')


class TodoController{
    static view(req,res){
        Todo.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static add(req,res){
        let obj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.create(obj)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err){
               let totalError = {}
            for(let i = 0; i < err.errors.length; i++){
                totalError[err.errors[i].path] = {
                    msg : err.errors[i].message
                }
            } 
            res.status(400).json(totalError) 
            } else{
            res.status(500).json('Internal server error!')
            }
        })
    }

    static getTodo(req,res){
        let params = req.params.id
        Todo.findOne({where:{id:params}})
        .then(result=>{
            if(result){
              res.status(200).json(result)  
            } else{
                res.status(404).json('data not found!')
            }
            
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static update(req,res){
        let params = Number(req.params.id)
        let obj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.update(obj,{where:{id:params}})
        .then(result=>{
            if(result[0]){
              res.status(200).json(result)  
            }
            else{
              res.status(404).json('not found')  
            }
        })
        .catch(err=>{
          res.status(400).json(err)  
        })
    }

    static delete(req,res){
        let params = req.params.id
        Todo.destroy({where:{id:params}})
        .then(result=>{
            if(result[0]){
             res.status(200).json(result)   
            } else{
             res.status(404).json('not found')
            }
            
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }


}

module.exports = TodoController