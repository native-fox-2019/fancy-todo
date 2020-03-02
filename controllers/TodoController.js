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
        
        Todo.create(newTodo)
            .then(() => {
                res.status(201).json({ msg: "New Todo has been created", newTodo })
            })
            .catch(err => {
                let msg = []
                err.errors.forEach(error => {
                    msg.push(error.message)
                })
                res.status(500).json(msg)
            })
    } 

    static findById = (req, res) => {
        let id = req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) {
                    res.status(404).json({ msg: 'Todo not found' })
                }
                res.status(200).json(todo)
            })
            .then(err => {
                res.status(500).json(err)
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
        
        Todo.findByPk(id)
            .then(todo => {
                if (!todo) {
                    res.status(404).json({ msg: "Todo not found" })
                }
                return Todo.update(editedTodo, { where: { id } })
            })
            .then(updated => {
                res.status(200).json({ msg: "Todo has been edited", editedTodo })
            })
            .catch(err => {
                let msg = []
                err.errors.forEach(error => {
                    msg.push(error.message)
                })
                res.status(500).json(msg)
            })
    }

    static delete = (req, res) => {
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