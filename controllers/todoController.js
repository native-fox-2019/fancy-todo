const { Todo } = require(`../models`)

class TodoController {

    static getAll (req, res, next) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static create (req, res, next) {
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
            next(err)
        })
    
    }

    static find (req, res, next) {
        let todoId = req.params.id
        Todo.findOne({where:{id:todoId}})
        .then(data => {
            if(data != null) {
                res.status(200).json(data)
            } else {
                throw new Error (`ID cannot be found`)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static update (req, res, next) {
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
                throw new Error (`ID cannot be found`)
            } else {
                res.status(200).json(updateTodo)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let todoId = req.params.id
        let deletedTodo = null
        Todo.findByPk(todoId)
        .then(data => {
            // console.log(data)
            if(data == null) {
                throw new Error (`ID cannot be found`)
            } else {
                deletedTodo = data
                return Todo.destroy({where:{id:todoId}})
            }
        })
        .then(data => {
            res.status(200).json(deletedTodo)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController