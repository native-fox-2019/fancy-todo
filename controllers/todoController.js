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

        let errors = {}

        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(newTodo)
        })
        .catch(err => {
            res.status(500).json(err)
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

        let errors = {}

        Todo.findByPk(todoId) //find first if the id is exist
        .then(data => {
            if (data != null){ //if there is a data specifici to the params id
                Todo.update(updateTodo,{where:{id:todoId}})
                .then(data => {
                    res.status(200).json(updateTodo)
                })
                .catch(err => {
                    res.status(404).json(err.errors)
                })
            } else {
                let error = {msg:`error not found`} //if the id is not found in the database
                res.status(404).json(error)
            }
        })
        .catch(err => {
            res.status(404).json(err)
        })

    }

    static delete (req, res) {
        let todoId = req.params.id
        let deletedTodo = null
        Todo.findOne({where:{id:todoId}}) //putting the data of deleted todo-list
        .then(data => {
            if (data != null) {
                deletedTodo = data
                Todo.destroy({where:{id:todoId}})
                .then(data => {
                    res.status(200).json(deletedTodo)   
                })
                .catch(err => {
                    res.status(500).send(err)
                })
            } else {
                let errors = {msg:`error not found (id not found)`} //will send this if there's no ID found
                res.status(404).json(errors)
            }   
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
}

module.exports = TodoController