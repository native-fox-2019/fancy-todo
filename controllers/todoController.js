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
            if (err.errors) {
                res.status(400).json(err.errors) //will go here if there is validation error
            } else {
                res.status(500).json(err) //will go here if there is server error
            }
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

        Todo.update(updateTodo,{where:{id:todoId}})
        .then(data => {
            if (data[0] == 0) {
                let error = {msg:`id not found`}
                res.status(404).json(error.msg)
            } else {
                res.status(200).json(updateTodo)
            }
        })
        .catch(err => {
            if (err.message) {
                res.status(400).json(err.message)
            } else {
                res.status(500).json(err)
            }
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