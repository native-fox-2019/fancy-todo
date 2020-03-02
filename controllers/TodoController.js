const { Todo } = require('../models')

class TodoController {
    static findAll = (req, res) => {
        Todo.findAll()
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create = (req, res) => {
        let { title, description, status, due_date } = req.body
        let newTodo = {
            title,
            description,
            status,
            due_date
        }
        if (!title || !description || !due_date) {
            res.status(400).json({ msg: "Validation error" })
        }
        Todo.create(newTodo)
            .then(() => {
                res.status(201).json({ msg: "New Todo has been created", newTodo })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } 

    static findById = (req, res) => {
        let id = req.params.id
        Todo.findByPk(id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .then(err => {
                res.status(404).json(err)
            })
    }

    static update = (req, res) => {
        let { title, description, status, due_date } = req.body
        let editedTodo = {
            title,
            description,
            status,
            due_date
        }
        let id = req.params.id
        if (!title || !description || !due_date) {
            res.status(400).json({ msg: "Validation error" })
        }
        Todo.update(editedTodo, { where: { id } })
            .then(() => {
                res.status(200).json({ msg: "Todo has been edited", editedTodo })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete = (req, res) => {
        let id = req.params.id
        Todo.destroy({ where: { id } })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = TodoController