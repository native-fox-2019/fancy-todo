const { Todo } = require('../models')

class TodoController {
    static findAll = (req, res, next) => {
        Todo.findAll({ where: { UserId: req.userData.id } })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create = (req, res, next) => {
        let { title, description, status, due_date } = req.body
        let newTodo = {
            title,
            description,
            status,
            due_date,
            UserId: req.userData.id
        }
        
        Todo.create(newTodo)
            .then(() => {
                res.status(201).json({ msg: "New Todo has been created", newTodo })
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    err.errors.forEach(error => {
                        msg.push(error.message)
                    })
                    res.status(400).json(msg)
                } else {
                    res.status(500).json(err)
                }
            })
    } 

    static findById = (req, res, next) => {
        let id = req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) {
                    throw new Error("Todo not found")
                }
                res.status(200).json(todo)
            })
            .catch(err => {
                if (err.message) {
                    res.status(404).json(err.message)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static update = (req, res, next) => {
        let { title, description, status, due_date } = req.body
        let editedTodo = {
            title,
            description,
            status,
            due_date
        }
        let id = req.params.id
        
        Todo.update(editedTodo, { where: { id } })
            .then(updated => {
                if (!updated[0]) {
                    throw new Error("Todo not found")
                }
                res.status(200).json({ msg: "Todo has been edited", editedTodo })
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    err.errors.forEach(error => {
                        msg.push(error.message)
                    })
                    res.status(400).json(msg)
                } else {
                    if (err.message) {
                        res.status(404).json(err.message)
                    } else {
                        res.status(500).json(err)
                    }
                }
            })
    }

    static delete = (req, res, next) => {
        let id = req.params.id
        let deleted
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) {
                    res.status(404).json({ msg: "Todo not found" })
                }
                deleted = todo
                return Todo.destroy({ where: { id } })
            })
            .then(() => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = TodoController