const { Todo } = require(`../models`)

class TodoController {

    static getAll (req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static create (req, res) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
    
        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(newTodo)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static find (req, res) {
        let todoId = req.params.id
        Todo.findOne({where:{id:todoId}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static update (req, res) {
        let todoId = req.params.id
        let updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        if(!title || !description || !due_date)

        Todo.update(updateTodo,{where:{id:todoId}})
        .then(data => {
            res.status(200).json(updateTodo)
        })
        .catch(err => {
            
        })
    }
}

module.exports = TodoController