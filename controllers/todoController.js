const { todo } = require('../models')

class TodoController {
    static getTodo = (req, res, next) => {
        todo.findAll()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }

    static getTodoId = (req, res) => {
        let id = Number(req.params.id)
        todo.findAll({
            where : {
                id : id
            }
        })
        
    }

    static addTodo = (req,res) => {
        let obj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        todo.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(404).json(err)
        })
    }
}

module.exports = TodoController